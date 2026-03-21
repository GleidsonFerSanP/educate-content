locals {
  source_dir           = var.content_source_dir != "" ? var.content_source_dir : abspath("${path.module}/..")
  results_email_sender = "${var.results_email_sender_local_part}@${var.root_domain}"

  candidate_files = fileset(local.source_dir, "**/*")

  upload_files = [
    for file in local.candidate_files : file
    if !startswith(file, ".git/")
    && !startswith(file, ".vscode/")
    && !startswith(file, ".project-docs-mcp/")
    && !startswith(file, "terraform/")
    && !startswith(file, ".terraform/")
    && !strcontains(file, "/.DS_Store")
    && file != ".DS_Store"
    && length(regexall("\\.(html|css|js|json|txt|xml|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|mp3|wav|ogg|m4a)$", lower(file))) > 0
    && can(filemd5("${local.source_dir}/${file}"))
  ]

  content_types = {
    html  = "text/html; charset=utf-8"
    css   = "text/css; charset=utf-8"
    js    = "application/javascript; charset=utf-8"
    json  = "application/json; charset=utf-8"
    txt   = "text/plain; charset=utf-8"
    xml   = "application/xml"
    svg   = "image/svg+xml"
    png   = "image/png"
    jpg   = "image/jpeg"
    jpeg  = "image/jpeg"
    gif   = "image/gif"
    webp  = "image/webp"
    ico   = "image/x-icon"
    woff  = "font/woff"
    woff2 = "font/woff2"
    ttf   = "font/ttf"
    eot   = "application/vnd.ms-fontobject"
    mp3   = "audio/mpeg"
    wav   = "audio/wav"
    ogg   = "audio/ogg"
    m4a   = "audio/mp4"
  }
}

data "aws_caller_identity" "current" {}

data "archive_file" "exam_api" {
  type        = "zip"
  source_file = "${path.module}/lambda/exam_api.py"
  output_path = "${path.module}/exam_api.zip"
}

resource "aws_s3_bucket" "site" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_object" "site_files" {
  for_each = toset(local.upload_files)

  bucket       = aws_s3_bucket.site.id
  key          = each.value
  source       = "${local.source_dir}/${each.value}"
  etag         = filemd5("${local.source_dir}/${each.value}")
  content_type = lookup(local.content_types, reverse(split(".", lower(each.value)))[0], "application/octet-stream")
}

resource "aws_dynamodb_table" "exam_attempts" {
  name         = "educate-exam-attempts"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "attempt_id"

  attribute {
    name = "attempt_id"
    type = "S"
  }
}

resource "aws_iam_role" "exam_api" {
  name = "educate-exam-api-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "exam_api" {
  name = "educate-exam-api-policy"
  role = aws_iam_role.exam_api.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*"
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ]
        Resource = aws_dynamodb_table.exam_attempts.arn
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "arn:aws:ses:${var.aws_region}:${data.aws_caller_identity.current.account_id}:identity/${var.root_domain}"
      }
    ]
  })
}

resource "aws_cloudwatch_log_group" "exam_api" {
  name              = "/aws/lambda/educate-exam-api"
  retention_in_days = 14
}

resource "aws_lambda_function" "exam_api" {
  function_name    = "educate-exam-api"
  role             = aws_iam_role.exam_api.arn
  handler          = "exam_api.lambda_handler"
  runtime          = "python3.12"
  filename         = data.archive_file.exam_api.output_path
  source_code_hash = data.archive_file.exam_api.output_base64sha256
  timeout          = 15

  environment {
    variables = {
      EXAM_TABLE_NAME         = aws_dynamodb_table.exam_attempts.name
      RESULTS_EMAIL_RECIPIENT = var.results_email_recipient
      RESULTS_EMAIL_SENDER    = local.results_email_sender
    }
  }

  depends_on = [aws_cloudwatch_log_group.exam_api]
}

resource "aws_lambda_permission" "exam_api_url" {
  statement_id           = "AllowPublicFunctionUrlInvoke"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.exam_api.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}

resource "aws_lambda_permission" "exam_api_invoke" {
  statement_id  = "AllowPublicFunctionInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.exam_api.function_name
  principal     = "*"
}

resource "aws_lambda_function_url" "exam_api" {
  function_name      = aws_lambda_function.exam_api.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_headers     = ["content-type"]
    allow_methods     = ["GET", "POST"]
    allow_origins     = ["https://${var.site_domain}", "http://localhost:8000", "http://127.0.0.1:8000"]
    expose_headers    = []
    max_age           = 300
  }

  depends_on = [
    aws_lambda_permission.exam_api_url,
    aws_lambda_permission.exam_api_invoke,
  ]
}

resource "aws_ses_domain_identity" "results" {
  domain = var.root_domain
}

resource "aws_route53_record" "ses_verification" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.root.zone_id
  name            = "_amazonses.${var.root_domain}"
  type            = "TXT"
  ttl             = 600
  records         = [aws_ses_domain_identity.results.verification_token]
}

resource "aws_ses_domain_dkim" "results" {
  domain = aws_ses_domain_identity.results.domain
}

resource "aws_route53_record" "ses_dkim" {
  allow_overwrite = true
  count           = 3
  zone_id         = data.aws_route53_zone.root.zone_id
  name            = "${aws_ses_domain_dkim.results.dkim_tokens[count.index]}._domainkey.${var.root_domain}"
  type            = "CNAME"
  ttl             = 600
  records         = ["${aws_ses_domain_dkim.results.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

data "aws_route53_zone" "root" {
  name         = "${var.root_domain}."
  private_zone = false
}

resource "aws_acm_certificate" "site" {
  provider                  = aws.us_east_1
  domain_name               = var.site_domain
  subject_alternative_names = []
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.root.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "site" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.bucket_name}-oac"
  description                       = "OAC for ${var.site_domain}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_origin_request_policy" "all_viewer_except_host" {
  name = "Managed-AllViewerExceptHostHeader"
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Educate content site"
  default_root_object = "index.html"
  aliases             = [var.site_domain]

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  origin {
    domain_name = trimsuffix(trimprefix(aws_lambda_function_url.exam_api.function_url, "https://"), "/")
    origin_id   = "exam-api-origin"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-${aws_s3_bucket.site.id}"

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.caching_optimized.id
  }

  ordered_cache_behavior {
    path_pattern             = "/api/*"
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"]
    cached_methods           = ["GET", "HEAD", "OPTIONS"]
    target_origin_id         = "exam-api-origin"
    viewer_protocol_policy   = "redirect-to-https"
    compress                 = true
    cache_policy_id          = data.aws_cloudfront_cache_policy.caching_disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer_except_host.id
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_s3_bucket_policy" "site_private_read_via_cloudfront" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipalReadOnly"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.site.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
          }
        }
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.site]
}

resource "aws_route53_record" "site_alias_a" {
  zone_id = data.aws_route53_zone.root.zone_id
  name    = var.site_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_alias_aaaa" {
  zone_id = data.aws_route53_zone.root.zone_id
  name    = var.site_domain
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
