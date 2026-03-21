# educate-content

Site educacional estático (HTML + CSS + JavaScript puro) com módulos interativos para crianças.

## URLs de produção

* Conteúdos: `https://educate.quantumopsai.com/index.html`
* Provas: `https://educate.quantumopsai.com/exams/index.html`

## Infraestrutura (Terraform)

A infraestrutura está em `./terraform` e publica o conteúdo com:

* Bucket S3 privado: `education-web-content`
* CloudFront (com OAC para acesso privado ao bucket)
* Certificado ACM em `us-east-1`
* DNS Route53 para `educate.quantumopsai.com`

### Comandos principais

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Execução local

```bash
python3 -m http.server 8000
```

Abrir: `http://localhost:8000/`

## Notas de integração mobile

Os apps Android e iOS devem usar o domínio CloudFront customizado:

* `https://educate.quantumopsai.com/index.html`
* `https://educate.quantumopsai.com/exams/index.html`

Prompt operacional para atualizar apps: `./terraform/PROMPT_ATUALIZACAO_APPS.md`
