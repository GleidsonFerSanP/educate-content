---
name: educate-content-agenting
description: Guia progressivo para agentes no projeto educate-content (site educacional estático em Vanilla JS). Use para fluxo de sessão MCP, paths relativos, padrões de módulos educacionais, contratos e documentação sem duplicação.
---

# Skill Hub — educate-content

## Quick start
1. `identify_context({ file_path: "./arquivo-alvo" })`
2. `get_current_focus()`
3. `start_session({ context, current_focus })` ou `get_merged_guidelines({ context })`
4. Implementar tarefa
5. `create_checkpoint({ summary, next_focus })`
6. `complete_session()`

## Convenção de paths (obrigatória)
Sempre usar `./` e caminho relativo ao repositório.

## Mapa de referências (progressive disclosure)
- Sessão e foco: `./SESSION-WORKFLOW.md`
- Contratos e validação: `./CONTRACT-REFERENCE.md`
- Documentação e ADR: `./DOCUMENTATION-WORKFLOW.md`
- Padrões de código do projeto: `./PATTERNS-REFERENCE.md`

## Anti-patterns
- Não iniciar código sem `identify_context`.
- Não usar caminho absoluto em exemplos de MCP.
- Não criar documentação sem `check_existing_documentation`.
- Não alterar contratos sem `validate_contract`.
- Não tentar “frameworkizar” o projeto (manter Vanilla JS).

## Escopo do projeto
- Site estático com múltiplos módulos educacionais independentes.
- Sem package manager, sem build, sem testes automatizados.
- Foco em experiência infantil (8-10 anos): clareza, interatividade, feedback imediato.
