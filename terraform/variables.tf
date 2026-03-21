variable "aws_region" {
  description = "Região AWS para criar o bucket"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Nome do bucket S3 usado pelas apps Android/iOS"
  type        = string
  default     = "education-web-content"
}

variable "content_source_dir" {
  description = "Diretório raiz do conteúdo estático a ser publicado"
  type        = string
  default     = ""
}

variable "root_domain" {
  description = "Domínio raiz hospedado no Route53"
  type        = string
  default     = "quantumopsai.com"
}

variable "site_domain" {
  description = "Domínio completo da aplicação web"
  type        = string
  default     = "educate.quantumopsai.com"
}

variable "results_email_recipient" {
  description = "Email que receberá os resultados das avaliações"
  type        = string
  default     = "gleidson.ferreirasantos@gmail.com"
}

variable "results_email_sender_local_part" {
  description = "Parte local do remetente usado pelo SES"
  type        = string
  default     = "assessments"
}
