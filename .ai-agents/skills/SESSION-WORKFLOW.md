# SESSION WORKFLOW — educate-content

## Objetivo

Manter foco, reduzir drift e preservar contexto útil em tarefas longas.

## Fluxo padrão

1. Identificar contexto:
   - `identify_context({ file_path: "./index.html" })`

2. Verificar foco atual:
   - `get_current_focus()`

3. Iniciar/continuar sessão:
   - `start_session({ context, current_focus })` quando não houver sessão
   - `get_merged_guidelines({ context })` para recarregar regras
4. Executar trabalho
5. Registrar progresso:
   - `create_checkpoint({ summary, next_focus })`

6. Finalizar:
   - `complete_session()`

## Quando atualizar foco

Use `update_focus({ new_focus, reason })` quando:
* usuário muda o objetivo
* tarefa atual encerrou e nova começou
* escopo trocou de módulo (ex.: `./logica-geral-kids/` → `./portugol-kids/`)

## Compaction prático

Para tarefas longas:
* checkpoint frequente (marcos reais)
* resumir decisões e pendências
* manter no foco: arquivo-alvo, regra de UX, risco principal

## Exemplos de foco bom

* “Ajustar feedback visual do jogo `./logica-programacao-kids/jogos/debug-detetive.html`”
* “Corrigir navegação quebrada entre `./portugol-kids/topicos/*.html`”

## Exemplos de foco ruim

* “mexer no site”
* “arrumar tudo”
