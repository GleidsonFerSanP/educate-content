import base64
import json
import os
from datetime import datetime, timezone

import boto3


TABLE_NAME = os.environ["EXAM_TABLE_NAME"]
RESULTS_EMAIL_RECIPIENT = os.environ["RESULTS_EMAIL_RECIPIENT"]
RESULTS_EMAIL_SENDER = os.environ["RESULTS_EMAIL_SENDER"]

table = boto3.resource("dynamodb").Table(TABLE_NAME)
ses = boto3.client("ses")


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def response(status_code, payload):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        },
        "body": json.dumps(payload),
    }


def parse_body(event):
    raw_body = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
        raw_body = base64.b64decode(raw_body).decode("utf-8")
    return json.loads(raw_body)


def attempt_id(lesson, device_id):
    return f"{lesson}#{device_id}"


def get_attempt(lesson, device_id):
    result = table.get_item(Key={"attempt_id": attempt_id(lesson, device_id)})
    return result.get("Item")


def normalize_attempt(item):
    if not item:
        return None

    return {
        "lesson": item.get("lesson"),
        "deviceId": item.get("device_id"),
        "studentName": item.get("student_name"),
        "studentAge": item.get("student_age"),
        "appliedAt": item.get("applied_at"),
        "startedAt": item.get("started_at"),
        "updatedAt": item.get("updated_at"),
        "submittedAt": item.get("submitted_at"),
        "status": item.get("status"),
        "currentQuestionIndex": item.get("current_question_index", 0),
        "answers": item.get("answers", {}),
        "score": item.get("score"),
        "totalQuestions": item.get("total_questions"),
        "emailSent": item.get("email_sent", False),
        "emailError": item.get("email_error"),
    }


def upsert_attempt(payload, existing_item=None):
    lesson = payload["lesson"]
    device_id = payload["deviceId"]
    timestamp = now_iso()

    item = existing_item or {
        "attempt_id": attempt_id(lesson, device_id),
        "lesson": lesson,
        "device_id": device_id,
        "created_at": timestamp,
    }

    item["student_name"] = payload.get("studentName", item.get("student_name", "")).strip()
    item["student_age"] = str(payload.get("studentAge", item.get("student_age", ""))).strip()
    item["applied_at"] = payload.get("appliedAt", item.get("applied_at")) or timestamp[:10]
    item["started_at"] = payload.get("startedAt", item.get("started_at")) or timestamp
    item["updated_at"] = timestamp
    item["current_question_index"] = int(
        payload.get("currentQuestionIndex", item.get("current_question_index", 0))
    )
    item["answers"] = payload.get("answers", item.get("answers", {}))
    item["status"] = payload.get("status", item.get("status", "in_progress"))
    item["user_agent"] = payload.get("userAgent", item.get("user_agent", ""))
    item["score"] = payload.get("score", item.get("score"))
    item["total_questions"] = payload.get("totalQuestions", item.get("total_questions"))

    if payload.get("submittedAt"):
        item["submitted_at"] = payload["submittedAt"]

    table.put_item(Item=item)
    return item


def send_results_email(item):
    answers = item.get("answers", {})
    answer_lines = "\n".join(
        f"- {question_id}: {answer}" for question_id, answer in sorted(answers.items())
    ) or "- No answers captured"

    subject = (
        f"[Educate] Resultado {item['lesson']} - "
        f"{item.get('student_name', 'Aluno sem nome')} - "
        f"{item.get('score', 0)}/{item.get('total_questions', 0)}"
    )

    body = f"""
Resultado de avaliacao Educate

Licao: {item.get('lesson')}
Aluno: {item.get('student_name')}
Idade: {item.get('student_age')}
Data de aplicacao: {item.get('applied_at')}
Inicio: {item.get('started_at')}
Envio: {item.get('submitted_at')}
Device ID: {item.get('device_id')}
Pontuacao: {item.get('score', 0)} / {item.get('total_questions', 0)}

Respostas:
{answer_lines}
""".strip()

    ses.send_email(
        Source=RESULTS_EMAIL_SENDER,
        Destination={"ToAddresses": [RESULTS_EMAIL_RECIPIENT]},
        Message={
            "Subject": {"Data": subject, "Charset": "UTF-8"},
            "Body": {"Text": {"Data": body, "Charset": "UTF-8"}},
        },
    )


def handle_get(event):
    params = event.get("queryStringParameters") or {}
    lesson = params.get("lesson")
    device_id = params.get("deviceId")

    if not lesson or not device_id:
        return response(400, {"error": "lesson and deviceId are required"})

    item = get_attempt(lesson, device_id)
    return response(
        200,
        {
            "exists": bool(item),
            "session": normalize_attempt(item),
        },
    )


def handle_post(event):
    payload = parse_body(event)
    action = payload.get("action")
    lesson = payload.get("lesson")
    device_id = payload.get("deviceId")

    if not action or not lesson or not device_id:
        return response(400, {"error": "action, lesson and deviceId are required"})

    existing_item = get_attempt(lesson, device_id)
    if (
        existing_item
        and existing_item.get("status") == "submitted"
        and action in {"start", "progress"}
    ):
        return response(
            200,
            {
                "locked": True,
                "session": normalize_attempt(existing_item),
                "emailSent": existing_item.get("email_sent", False),
            },
        )

    if action == "start":
        payload["status"] = "in_progress"
        item = upsert_attempt(payload, existing_item)
        return response(200, {"session": normalize_attempt(item)})

    if action == "progress":
        payload["status"] = "in_progress"
        item = upsert_attempt(payload, existing_item)
        return response(200, {"session": normalize_attempt(item)})

    if action == "submit":
        payload["status"] = "submitted"
        payload["submittedAt"] = payload.get("submittedAt") or now_iso()
        item = upsert_attempt(payload, existing_item)

        email_sent = False
        email_error = item.get("email_error")
        try:
            send_results_email(item)
            item["email_sent"] = True
            item["email_sent_at"] = now_iso()
            item["email_error"] = None
            email_sent = True
        except Exception as exc:
            item["email_sent"] = False
            item["email_error"] = str(exc)[:500]
            email_error = item["email_error"]

        table.put_item(Item=item)
        return response(
            200,
            {
                "session": normalize_attempt(item),
                "emailSent": email_sent,
                "emailError": email_error,
            },
        )

    return response(400, {"error": f"unsupported action: {action}"})


def lambda_handler(event, _context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    path = event.get("rawPath", "")

    if method == "OPTIONS":
        return response(200, {"ok": True})

    if not path.endswith("/exam"):
        return response(400, {"error": "unsupported path"})

    if method == "GET":
        return handle_get(event)

    if method == "POST":
        return handle_post(event)

    return response(405, {"error": "method not allowed"})
