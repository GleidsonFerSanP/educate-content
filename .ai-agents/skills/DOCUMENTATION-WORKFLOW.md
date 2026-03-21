# DOCUMENTATION WORKFLOW — educate-content

## Princípio

Documentar sem duplicar, com metadata consistente e decisão arquitetural rastreável.

## Workflow obrigatório

1. Identificar contexto:
   - `identify_context({ file_path: "./docs/isabella-website/architecture/modular-structure.md" })`

2. Verificar documentação existente:
   - `check_existing_documentation({ title, topics, keywords })`

3. Se não houver duplicação, criar/atualizar:
   - `manage_documentation({ action: "create" | "update", ... })`

4. Se houve escolha arquitetural, registrar:
   - `add_decision({ title, context, decision, alternatives, ... })`

## Onde documentar neste projeto

* Arquitetura: `./docs/isabella-website/architecture/`
* Guias operacionais por módulo (quando necessário): dentro do módulo relevante

## Critérios de qualidade

* Contexto do módulo explicitado (`logica-geral-kids`,  `logica-programacao-kids`,  `portugol-kids`, etc.)
* Exemplos executáveis com caminhos relativos (`./...`)
* Sem placeholders genéricos
* Linguagem objetiva e curta (contexto é finito)

## Evitar

* Criar `.md` novo sem busca de duplicação
* Repetir conteúdo já coberto em `./AGENTS.md`
* Exemplos com caminho absoluto
