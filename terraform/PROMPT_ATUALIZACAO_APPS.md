# Prompt para atualizar Android/iOS após mudança de domínio de conteúdo

Use o prompt abaixo no repositório de cada app:

---

Atualize o app para usar o domínio oficial de conteúdo `educate.quantumopsai.com`.

Requisitos:

1. Localizar e substituir TODAS as URLs antigas por:
   - Conteúdos: `https://educate.quantumopsai.com/index.html`

   - Provas: `https://educate.quantumopsai.com/exams/index.html`

2. Atualizar constantes de configuração (ex.: `EDUCATIONAL_CONTENT_URL`, `EXAMS_URL`, `MAIN_URL`, `URLConfiguration`, `URLConfiguration.swift`).
3. Verificar `loadUrl(...)` hardcoded em Activities/Views e substituir para usar as constantes.
4. Atualizar documentação que menciona URLs antigas (`README`, `docs`, guias de arquitetura/migração).
5. Validar build e navegação:
   - Home → Conteúdos abre `index.html`

   - Home → Provas abre `exams/index.html`

   - Fallback de URL (se houver) também aponta para o domínio oficial.
6. Entregar relatório final com:
   - Arquivos alterados
   - Antes/depois das URLs
   - Evidência de build/teste executado.

---
