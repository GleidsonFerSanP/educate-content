# QUICK REFERENCE — educate-content

## Regra #1 (sempre)

Use **paths relativos** com `./` em chamadas MCP.
* ✅ `identify_context({ file_path: "./logica-programacao-kids/jogos/debug-detetive.html" })`
* ❌ Evite caminho absoluto; sempre use `./`

## Workflow de toda conversa

1. `identify_context({ file_path: "./caminho/arquivo" })`
2. `get_current_focus()`
3. Se não houver sessão: `start_session({ context, current_focus })`
4. Carregar regras: `get_merged_guidelines({ context })`
5. Executar tarefa
6. `create_checkpoint({ summary, next_focus })`
7. `complete_session()` quando finalizar

## Antes de alterar interfaces/contratos

1. `get_contracts({ context })`
2. `validate_contract({ contract_name, code })`

## Antes de criar documentação

1. `check_existing_documentation({ title, topics, keywords })`
2. Se não duplicar: `manage_documentation({ action: "create", ... })`
3. Se houver decisão técnica: `add_decision({ ... })`

## Padrões do projeto (resumo)

* Stack: HTML/CSS/Vanilla JS (sem framework/build/test runner)
* Módulos independentes por pasta (`logica-geral-kids`,   `logica-programacao-kids`,   `portugol-kids`)
* UX infantil: feedback imediato, animação, som e progressão
* Utilitários recorrentes: `mostrarFeedback`,   `tocarSom*`,   `criarConfetes`,   `localStorage`

## Comandos úteis

* Servidor local: `python3 -m http.server 8000`
* Abrir: `http://localhost:8000/`

## Referências

* `./AGENTS.md`
* `./.ai-agents/skills/SKILL.md`
* `./.ai-agents/skills/SESSION-WORKFLOW.md`
* `./.ai-agents/skills/CONTRACT-REFERENCE.md`
* `./.ai-agents/skills/DOCUMENTATION-WORKFLOW.md`
* `./.ai-agents/skills/PATTERNS-REFERENCE.md`
