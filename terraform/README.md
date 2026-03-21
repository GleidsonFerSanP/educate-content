# Terraform - Deploy conteúdo Educate com CloudFront + S3

Esta pasta provisiona a infraestrutura para publicar o conteúdo estático do projeto com domínio customizado, CDN e bucket privado.

Arquitetura provisionada:

* Route53: `educate.quantumopsai.com`
* CloudFront com OAC
* Bucket S3 privado: `education-web-content`
* Certificado ACM em `us-east-1`

Também faz upload automático dos arquivos estáticos do projeto para o bucket de origem.

## Pré-requisitos

* Terraform >= 1.5
* AWS CLI configurado (`aws configure`) com permissão para S3, CloudFront, ACM e Route53

## Como usar

1. Entrar na pasta Terraform:

```bash
cd terraform
```

1. Criar seu arquivo de variáveis:

```bash
cp terraform.tfvars.example terraform.tfvars
```

1. (Opcional) Ajustar região, domínio raiz, subdomínio e nome do bucket em `terraform.tfvars`.

1. Inicializar e aplicar:

```bash
terraform init
terraform plan
terraform apply
```

## Saídas importantes

Após `apply`, o Terraform mostra:

* `content_url`: URL para conteúdos
* `exams_url`: URL para provas
* `cloudfront_domain`: domínio padrão da distribuição
* `site_domain`: domínio customizado configurado

## URLs esperadas pelos apps

* Conteúdos: `https://educate.quantumopsai.com/index.html`
* Provas: `https://educate.quantumopsai.com/exams/index.html`

## Observações

* Nome de bucket S3 é globalmente único. Se `education-web-content` já existir em outra conta, altere `bucket_name` em `terraform.tfvars`.
* O bucket não é exposto publicamente. O acesso ao conteúdo acontece via CloudFront com Origin Access Control.
* O certificado do CloudFront precisa existir em `us-east-1`, por isso o provider AWS com alias é usado no Terraform.
* Se mudar `site_domain`, atualize também as URLs nos apps móveis.
* O upload ignora pastas de infraestrutura e metadados locais (`terraform/`,  `.git/`,  `.vscode/`, etc).
