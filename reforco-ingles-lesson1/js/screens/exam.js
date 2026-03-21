import { examConfig } from "../data.js";

const STORAGE_KEY = `${examConfig.lessonId}_assessment_session_v1`;
const DEVICE_COOKIE = "educate_exam_device_id";
const STATUS_COOKIE = `${examConfig.lessonId}_assessment_status`;
const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? ""
    : "/api/exam";

function nowIso() {
  return new Date().toISOString();
}

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function getCookie(name) {
  const prefix = `${name}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
}

function setCookie(name, value, maxAgeDays = 365) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeDays * 86400}; SameSite=Lax`;
}

function getOrCreateDeviceId() {
  const existing = getCookie(DEVICE_COOKIE);
  if (existing) return decodeURIComponent(existing);

  const generated =
    window.crypto?.randomUUID?.() ||
    `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  setCookie(DEVICE_COOKIE, generated);
  return generated;
}

function loadSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  setCookie(STATUS_COOKIE, session.status);
}

async function fetchRemoteState(deviceId) {
  if (!API_URL) return null;
  try {
    const response = await fetch(
      `${API_URL}?lesson=${encodeURIComponent(examConfig.lessonId)}&deviceId=${encodeURIComponent(deviceId)}`,
      { method: "GET" },
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (_) {
    return null;
  }
}

async function postExamState(action, session) {
  if (!API_URL) return null;
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        lesson: examConfig.lessonId,
        deviceId: session.deviceId,
        studentName: session.studentName,
        studentAge: session.studentAge,
        appliedAt: session.appliedAt,
        startedAt: session.startedAt,
        currentQuestionIndex: session.currentQuestionIndex,
        answers: session.answers,
        score: session.score,
        totalQuestions: session.totalQuestions,
        submittedAt: session.submittedAt,
        userAgent: window.navigator.userAgent,
      }),
    });
    return await response.json();
  } catch (_) {
    return null;
  }
}

function scoreExam(session) {
  return examConfig.questions.reduce((total, question) => {
    return total + (session.answers[question.id] === question.answer ? 1 : 0);
  }, 0);
}

function renderLoading(container) {
  container.innerHTML = `
    <section class="card center screen-enter">
      <h2>${examConfig.pageTitle}</h2>
      <p class="hint">Checking previous attempt...</p>
    </section>
  `;
}

function renderIntro(container, session, context) {
  container.innerHTML = `
    <section class="card screen-enter">
      <div class="lock-banner">
        <strong>Formal assessment</strong>
        <span>High intermediate level based only on Lesson 1 content.</span>
      </div>
      <h2>${examConfig.pageTitle}</h2>
      <p class="hint">The assessment locks on this device after submission.</p>
      <div class="exam-meta-grid">
        <label class="field">
          <span>Name</span>
          <input id="studentName" class="input" type="text" maxlength="80" placeholder="Student name" />
        </label>
        <label class="field">
          <span>Age</span>
          <input id="studentAge" class="input" type="number" min="6" max="18" placeholder="Age" />
        </label>
        <label class="field field-wide">
          <span>Application date</span>
          <input id="appliedAt" class="input" type="date" value="${getTodayString()}" readonly />
        </label>
      </div>
      <div class="choice-list" style="margin-top:16px;">
        <button id="startExamBtn" class="btn btn-primary btn-block" aria-label="Start assessment">Start assessment</button>
        <button id="homeBtn" class="btn btn-secondary btn-block" aria-label="Go back to home">Back to home</button>
      </div>
    </section>
  `;

  container.querySelector("#homeBtn")?.addEventListener("click", () => {
    context.goTo("home");
  });

  container.querySelector("#startExamBtn")?.addEventListener("click", async () => {
    const studentName = container.querySelector("#studentName")?.value.trim() || "";
    const studentAge = container.querySelector("#studentAge")?.value.trim() || "";
    const appliedAt = container.querySelector("#appliedAt")?.value || getTodayString();

    if (!studentName || !studentAge) {
      context.showToast("Fill in name and age.");
      return;
    }

    const startedSession = {
      lessonId: examConfig.lessonId,
      deviceId: session.deviceId,
      studentName,
      studentAge,
      appliedAt,
      startedAt: nowIso(),
      updatedAt: nowIso(),
      currentQuestionIndex: 0,
      answers: {},
      totalQuestions: examConfig.questions.length,
      score: 0,
      status: "in_progress",
      emailSent: false,
      emailError: null,
    };

    saveSession(startedSession);
    const remote = await postExamState("start", startedSession);
    if (remote?.session) {
      Object.assign(startedSession, remote.session);
      saveSession(startedSession);
    }

    renderQuestion(container, startedSession, context);
  });
}

function renderQuestion(container, session, context) {
  const question = examConfig.questions[session.currentQuestionIndex];
  const selected = session.answers[question.id];

  container.innerHTML = `
    <section class="card screen-enter">
      <div class="assessment-summary">
        <span class="chip">${session.studentName}</span>
        <span class="chip">${session.studentAge} years</span>
        <span class="chip">${session.appliedAt}</span>
        <span class="chip">Question ${session.currentQuestionIndex + 1} / ${examConfig.questions.length}</span>
      </div>
      <h2>${examConfig.pageTitle}</h2>
      <h3 class="question-title">${question.prompt}</h3>
      <p class="hint">${question.context || "Choose the best answer."}</p>
      <div class="choice-list">
        ${question.options
          .map((option) => {
            const selectedClass = option === selected ? " option-selected" : "";
            return `<button class="btn btn-secondary btn-block optionBtn${selectedClass}" data-option="${option}">${option}</button>`;
          })
          .join("")}
      </div>
      <div class="assessment-nav">
        <button id="prevQuestionBtn" class="btn btn-secondary" ${session.currentQuestionIndex === 0 ? "disabled" : ""}>Previous</button>
        <button id="nextQuestionBtn" class="btn btn-primary">${session.currentQuestionIndex === examConfig.questions.length - 1 ? "Review" : "Next"}</button>
      </div>
      <p class="mini-note">Answers are saved on this device after every step. If the connection drops, the assessment resumes from the last saved question.</p>
    </section>
  `;

  [...container.querySelectorAll(".optionBtn")].forEach((button) => {
    button.addEventListener("click", async () => {
      session.answers[question.id] = button.dataset.option;
      session.updatedAt = nowIso();
      saveSession(session);
      context.animateCorrect(button);
      const remote = await postExamState("progress", session);
      if (remote?.locked && remote.session) {
        Object.assign(session, remote.session);
        saveSession(session);
        renderSubmitted(container, session, context);
        return;
      }
      renderQuestion(container, session, context);
    });
  });

  container.querySelector("#prevQuestionBtn")?.addEventListener("click", async () => {
    session.currentQuestionIndex = Math.max(0, session.currentQuestionIndex - 1);
    session.updatedAt = nowIso();
    saveSession(session);
    await postExamState("progress", session);
    renderQuestion(container, session, context);
  });

  container.querySelector("#nextQuestionBtn")?.addEventListener("click", async () => {
    if (!session.answers[question.id]) {
      context.showToast("Select one option first.");
      return;
    }

    if (session.currentQuestionIndex === examConfig.questions.length - 1) {
      renderReview(container, session, context);
      return;
    }

    session.currentQuestionIndex += 1;
    session.updatedAt = nowIso();
    saveSession(session);
    await postExamState("progress", session);
    renderQuestion(container, session, context);
  });
}

function renderReview(container, session, context) {
  const unanswered = examConfig.questions.filter((question) => !session.answers[question.id]);
  const score = scoreExam(session);

  container.innerHTML = `
    <section class="card screen-enter">
      <div class="lock-banner">
        <strong>Final review</strong>
        <span>${unanswered.length === 0 ? "All questions answered." : `${unanswered.length} unanswered question(s).`}</span>
      </div>
      <h2>${examConfig.pageTitle}</h2>
      <p class="hint">Estimated score before submission: ${score} / ${examConfig.questions.length}</p>
      <div class="review-list">
        ${examConfig.questions
          .map((question, index) => {
            const answer = session.answers[question.id] || "Not answered yet";
            return `<div class="review-item"><strong>${index + 1}. ${question.prompt}</strong><span>${answer}</span></div>`;
          })
          .join("")}
      </div>
      <div class="assessment-nav">
        <button id="backToQuestionsBtn" class="btn btn-secondary">Back to questions</button>
        <button id="submitExamBtn" class="btn btn-primary" ${unanswered.length ? "disabled" : ""}>Submit assessment</button>
      </div>
    </section>
  `;

  container.querySelector("#backToQuestionsBtn")?.addEventListener("click", () => {
    renderQuestion(container, session, context);
  });

  container.querySelector("#submitExamBtn")?.addEventListener("click", async () => {
    session.score = scoreExam(session);
    session.submittedAt = nowIso();
    session.updatedAt = nowIso();
    session.status = "submitted_pending_sync";
    saveSession(session);
    renderSubmitted(container, session, context);

    const remote = await postExamState("submit", session);
    if (remote?.session) {
      Object.assign(session, remote.session);
      session.status = "submitted";
      session.emailSent = remote.emailSent ?? session.emailSent;
      session.emailError = remote.emailError ?? null;
      saveSession(session);
      renderSubmitted(container, session, context);
      return;
    }

    renderSubmitted(container, session, context);
  });
}

function renderSubmitted(container, session, context) {
  const pending = session.status === "submitted_pending_sync";
  const score = session.score ?? scoreExam(session);

  container.innerHTML = `
    <section class="card center screen-enter">
      <div class="lock-banner">
        <strong>Assessment locked on this device</strong>
        <span>${pending ? "Submission saved locally. Waiting to sync the result." : "This device cannot start this assessment again."}</span>
      </div>
      <h2>${examConfig.pageTitle}</h2>
      <p class="score">${score} / ${examConfig.questions.length}</p>
      <div class="assessment-summary">
        <span class="chip">${session.studentName}</span>
        <span class="chip">${session.studentAge} years</span>
        <span class="chip">${session.appliedAt}</span>
      </div>
      <p class="hint">${pending ? "Keep this device online to send the result by email." : session.emailSent ? "Result sent by email." : "Result locked. Email dispatch may need a retry."}</p>
      ${session.emailError ? `<p class="mini-note">Email error: ${session.emailError}</p>` : ""}
      <div class="choice-list" style="margin-top:16px;">
        ${pending || session.emailSent === false ? '<button id="retrySyncBtn" class="btn btn-primary btn-block">Retry result sync</button>' : ""}
        <button id="homeBtn" class="btn btn-secondary btn-block">Back to home</button>
      </div>
    </section>
  `;

  container.querySelector("#retrySyncBtn")?.addEventListener("click", async () => {
    const remote = await postExamState("submit", {
      ...session,
      status: "submitted",
    });
    if (remote?.session) {
      Object.assign(session, remote.session);
      session.status = "submitted";
      session.emailSent = remote.emailSent ?? session.emailSent;
      session.emailError = remote.emailError ?? null;
      saveSession(session);
      renderSubmitted(container, session, context);
    } else {
      context.showToast("Sync still pending.");
    }
  });

  container.querySelector("#homeBtn")?.addEventListener("click", () => {
    context.goTo("home");
  });
}

export function renderExam(container, context) {
  context.completeScreen("exam");
  renderLoading(container);

  void (async () => {
    const deviceId = getOrCreateDeviceId();
    let session = loadSession();

    if (!session) {
      const remote = await fetchRemoteState(deviceId);
      if (remote?.session) {
        session = { ...remote.session, deviceId };
        saveSession(session);
      }
    } else if (session.status === "submitted_pending_sync" && navigator.onLine) {
      const remote = await postExamState("submit", {
        ...session,
        status: "submitted",
      });
      if (remote?.session) {
        session = {
          ...remote.session,
          status: "submitted",
          emailSent: remote.emailSent ?? false,
          emailError: remote.emailError ?? null,
        };
        saveSession(session);
      }
    } else {
      const remote = await fetchRemoteState(deviceId);
      if (remote?.session?.status === "submitted") {
        session = { ...remote.session, deviceId };
        saveSession(session);
      }
    }

    const effectiveSession = session ? { ...session, deviceId } : { deviceId };

    if (!session) {
      renderIntro(container, effectiveSession, context);
      return;
    }

    if (effectiveSession.status === "submitted" || effectiveSession.status === "submitted_pending_sync") {
      renderSubmitted(container, effectiveSession, context);
      return;
    }

    renderQuestion(container, effectiveSession, context);
  })();
}
