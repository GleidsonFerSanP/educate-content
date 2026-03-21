output "bucket_name" {
  description = "Nome do bucket provisionado"
  value       = aws_s3_bucket.site.id
}

output "content_url" {
  description = "URL principal de conteúdo via CloudFront e domínio customizado"
  value       = "https://${var.site_domain}/index.html"
}

output "exams_url" {
  description = "URL de provas via CloudFront e domínio customizado"
  value       = "https://${var.site_domain}/exams/index.html"
}

output "cloudfront_domain" {
  description = "Domain name padrão da distribuição CloudFront"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "site_domain" {
  description = "Domínio customizado do site"
  value       = var.site_domain
}

output "s3_origin_domain" {
  description = "Domain do bucket (origem privada do CloudFront)"
  value       = aws_s3_bucket.site.bucket_regional_domain_name
}

output "exam_api_public_path" {
  description = "Path público da API de avaliações servida pelo CloudFront"
  value       = "https://${var.site_domain}/api/exam"
}

output "exam_lambda_url" {
  description = "Function URL da API de avaliações"
  value       = aws_lambda_function_url.exam_api.function_url
}

output "exam_results_table_name" {
  description = "Tabela DynamoDB usada para tentativas e resultados das avaliações"
  value       = aws_dynamodb_table.exam_attempts.name
}

output "results_email_sender" {
  description = "Email remetente configurado para envio dos resultados"
  value       = local.results_email_sender
}
