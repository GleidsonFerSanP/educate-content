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
