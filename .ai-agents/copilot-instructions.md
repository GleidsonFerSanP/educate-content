# Copilot Instructions (local) — educate-content

## Fonte principal
Leia primeiro `./AGENTS.md`.

## Regras centrais
1. Sempre usar paths relativos com `./` em exemplos MCP.
2. Iniciar por contexto/foco antes de mudanças.
3. Não criar documentação sem checar duplicação.
4. Manter arquitetura modular e Vanilla JS.
5. Priorizar mudanças pequenas e específicas por módulo.

## Workflow MCP padrão
1. `identify_context({ file_path: "./caminho/arquivo" })`
2. `get_current_focus()`
3. `start_session({ context, current_focus })` ou `get_merged_guidelines({ context })`
4. Executar tarefa
5. `create_checkpoint({ summary, next_focus })`
6. `complete_session()`

## Workflow de documentação
1. `check_existing_documentation({ ... })`
2. `manage_documentation({ action: "create" | "update", ... })`
3. `add_decision({ ... })` para decisões arquiteturais

## Contextos comuns no repositório
- Hub principal: `./index.html`, `./css/styles.css`, `./js/main.js`
- Módulos educacionais: `./logica-geral-kids/`, `./logica-programacao-kids/`, `./portugol-kids/`
- Documentação de arquitetura: `./docs/isabella-website/architecture/`

## Lembrete final
Contexto é finito: usar instruções diretas, referências por arquivo e progressive disclosure (SKILL hub → arquivos específicos).
