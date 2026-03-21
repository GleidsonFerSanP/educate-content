# CONTRACT REFERENCE — educate-content

## Quando usar contratos

Sempre que alterar interfaces implícitas entre páginas, utilitários JS e fluxo educacional.

## Workflow

1. `identify_context({ file_path: "./caminho/arquivo.html" })`
2. `get_contracts({ context })`
3. Implementar alteração
4. `validate_contract({ contract_name, code })`

## Contratos críticos recomendados neste projeto

### 1) Contrato de feedback em jogos

* Toda página de jogo deve exibir retorno imediato ao aluno.
* Padrão esperado: função `mostrarFeedback(...)` e elementos visuais correspondentes.
* Resultado: sucesso/erro precisam ser perceptíveis em < 1 ação.

### 2) Contrato de áudio resiliente

* Sons não podem quebrar o fluxo caso Web Audio não esteja disponível.
* Envolver chamadas em `try/catch`.
* Falha de áudio não impede o jogo.

### 3) Contrato de navegação relativa

* Links entre páginas devem permanecer relativos.
* Evitar hardcode de domínio/host.
* Estrutura modular não deve depender de roteador externo.

### 4) Contrato de persistência local

* Progresso no `localStorage` por namespace de módulo (ex.: `portugol_kids_*`).
* Leitura inválida deve falhar com fallback seguro.

## Checklist rápido de validação

* [ ] Não quebrou função utilitária compartilhada do módulo
* [ ] Mantém linguagem infantil clara
* [ ] Mantém acessibilidade mínima (texto visível + feedback)
* [ ] Mantém caminho relativo em links e exemplos MCP
