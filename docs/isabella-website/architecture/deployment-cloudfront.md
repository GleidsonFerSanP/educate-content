# Deployment Architecture - CloudFront + S3

## Objetivo

Padronizar a publicação do conteúdo web educacional com domínio customizado, CDN e bucket privado.

## Arquitetura atual

* Domínio de acesso: `educate.quantumopsai.com`
* CDN: AWS CloudFront
* Origem: bucket S3 privado `education-web-content`
* Controle de acesso à origem: CloudFront OAC (SigV4)
* Certificado TLS: ACM (`us-east-1`)
* DNS: Route53 (zona pública `quantumopsai.com`)

## Fluxo de requisição

1. Cliente acessa `https://educate.quantumopsai.com/...`
2. Route53 resolve para CloudFront (A/AAAA alias)
3. CloudFront aplica cache e solicita objeto ao S3 com OAC
4. S3 responde somente para o ARN da distribuição CloudFront

## Infra as Code

Toda a infraestrutura está em `./terraform` :

* `versions.tf`: providers AWS (inclui alias `us_east_1` para ACM/CloudFront)
* `variables.tf`: `bucket_name`,  `root_domain`,  `site_domain`, etc.
* `main.tf`: S3 + upload dos estáticos + ACM + CloudFront + Route53
* `outputs.tf`: `content_url`,  `exams_url`,  `cloudfront_domain`,  `site_domain`

## URLs oficiais

* Conteúdos: `https://educate.quantumopsai.com/index.html`
* Provas: `https://educate.quantumopsai.com/exams/index.html`

## Contrato de integração mobile

Apps Android e iOS devem apontar exclusivamente para o domínio customizado:

* `EDUCATIONAL_CONTENT_URL` / `educationalContentURL` → `https://educate.quantumopsai.com/index.html`
* `EXAMS_URL` / `examsURL` → `https://educate.quantumopsai.com/exams/index.html`

Material de apoio para atualização: `./terraform/PROMPT_ATUALIZACAO_APPS.md`

## Validação operacional executada

Validação HTTP realizada após deploy:

* `GET/HEAD https://educate.quantumopsai.com/index.html` → `200`
* `GET/HEAD https://educate.quantumopsai.com/exams/index.html` → `200`

Headers observados incluem `via: ... cloudfront.net` e `x-cache: Miss from cloudfront` , confirmando tráfego pela CDN.
