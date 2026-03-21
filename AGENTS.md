# AGENTS.md

## Projeto

**educate-content** é um site educacional estático (HTML + CSS + JavaScript puro) focado em crianças de 8-10 anos.

Módulos principais no repositório:
* `./index.html` (hub principal Educate)
* `./logica-geral-kids/` (raciocínio lógico geral)
* `./logica-programacao-kids/` (algoritmos, loops, decisões, debug)
* `./portugol-kids/` (programação em Portugol)
* `./tutorial-whatsapp-windows/` (tutorial guiado)
* `./exams/` (provas/avaliações)

Arquitetura modular documentada em:
* `./docs/isabella-website/architecture/modular-structure.md`

---

## Dev Environment (sem build)

Não há framework, empacotador, package manager, pipeline de testes ou Docker.

Fluxo local recomendado:
1. Entrar na raiz do projeto.
2. Subir servidor estático para evitar problemas de caminho/CORS:
   - `python3 -m http.server 8000`

3. Abrir:
   - `http://localhost:8000/`

Deploy é estático (S3 sync), ver referência de fluxo em:
* `./logica-programacao-kids/DEPLOY.md`

### Deploy atual (produção)

O deploy em produção está definido por IaC (Terraform) em `./terraform` com:
* S3 privado: `education-web-content`
* CloudFront com OAC
* ACM + Route53 para `educate.quantumopsai.com`

URLs oficiais de produção:
* Conteúdos: `https://educate.quantumopsai.com/index.html`
* Provas: `https://educate.quantumopsai.com/exams/index.html`

Para atualizar Android/iOS após mudanças de domínio:
* usar `./terraform/PROMPT_ATUALIZACAO_APPS.md`

---

## Convenções de Código

* **Vanilla JS apenas** (sem frameworks).
* Manter UX infantil: linguagem simples, feedback imediato, visual lúdico.
* Preservar padrões existentes dos módulos:
  + funções de feedback (`mostrarFeedback`)
  + sons com Web Audio API (`tocarSom`,    `tocarSomAcerto`,    `tocarSomErro`)
  + celebração (`criarConfetes`)
  + persistência (`localStorage`)
* Preferir mudanças pequenas e localizadas por módulo.
* Evitar dependências externas.
* Responsividade mobile-first deve ser preservada.

---

## Arquitetura e Escopo

Cada módulo possui seus próprios arquivos:
* `index.html`
* `css/styles.css`
* `js/main.js`
* subpastas `topicos/` e `jogos/` (quando aplicável)

Prática do projeto: independência de módulo > compartilhamento agressivo de código.
Duplicação utilitária entre módulos pode ser intencional.

---

## MCP Quick Start (OBRIGATÓRIO)

Sempre usar **paths relativos** começando com `./` em exemplos e chamadas.

### Regra crítica de paths

* ✅ Correto: `identify_context({ file_path: "./logica-geral-kids/jogos/detetive-logico.html" })`
* ❌ Errado: usar caminho absoluto (sempre use `./`)

### Fluxo base por conversa

1. `identify_context({ file_path: "./caminho/do/arquivo" })`
2. `get_current_focus()`
3. `start_session({ context, current_focus })` **ou** `get_merged_guidelines({ context })`
4. Executar a tarefa
5. `create_checkpoint({ summary, next_focus })`
6. `complete_session()` ao finalizar

### Fluxo para documentação e arquitetura

Antes de criar documentação nova:
1. `check_existing_documentation({ ... })`
2. Se não houver duplicação, `manage_documentation({ action: "create", ... })`

Para decisões arquiteturais:
* `add_decision({ title, context, decision, alternatives, ... })`

Para contratos/interfaces:
1. `get_contracts({ context })`
2. `validate_contract({ contract_name, code })`

---

## Workflow de Sessão (prático)

* Revalidar foco quando o pedido do usuário mudar (`update_focus`).
* Criar checkpoint a cada marco relevante (aprox. 5-10 interações ou mudança de fase).
* Em tarefas longas, refrescar contexto periodicamente (`refresh_session_context`).

---

## Verificação antes de encerrar

* Rodar checagem manual do fluxo alterado no navegador.
* Validar links relativos entre páginas.
* Confirmar que sons/animações não quebraram interação.
* Garantir que nenhum exemplo em documentação usa path absoluto.

---

## Referências internas

* Quick checklist: `./.ai-agents/QUICK-REFERENCE.md`
* Hub de skills: `./.ai-agents/skills/SKILL.md`
* Workflow de sessão: `./.ai-agents/skills/SESSION-WORKFLOW.md`
* Contratos: `./.ai-agents/skills/CONTRACT-REFERENCE.md`
* Documentação: `./.ai-agents/skills/DOCUMENTATION-WORKFLOW.md`
* Padrões do projeto: `./.ai-agents/skills/PATTERNS-REFERENCE.md`
* Instruções Copilot locais: `./.ai-agents/copilot-instructions.md`
