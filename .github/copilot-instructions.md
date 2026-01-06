# 🤖 GitHub Copilot Instructions - Isabella Website - Conteúdo Educacional Infantil

> **Este projeto usa Project Docs MCP para gerenciar documentação e contratos**

## 📋 Workflow Obrigatório

### Antes de Qualquer Mudança

1. **Identifique o contexto**: Use MCP tool `identify_context` com file_path
2. **Consulte contratos**: Use MCP tool `get_contracts` para o contexto
3. **Valide código**: Use MCP tool `validate_contract` antes de commit

### Antes de Criar Documentação

1. **Verifique duplicação**: Use MCP tool `check_existing_documentation`
2. **Registre metadata**: Use MCP tool `manage_documentation` após criar .md

### Ao Fazer Decisões Arquiteturais

1. **Registre decisões**: Use MCP tool `add_decision` com contexto e alternativas

## 🛠️ Stack do Projeto

- **frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **hosting**: AWS S3 Static Website
- **deployment**: AWS CLI sync
- **animations**: CSS Animations + Canvas API
- **audio**: Web Audio API (OscillatorNode)
- **storage**: LocalStorage API
- **git**: GitHub (GleidsonFerSanP/educate-content)

## 🎯 Princípios

- Vanilla JS apenas - sem frameworks
- Jogos 100% interativos com feedback imediato
- Linguagem simples e visual para crianças 8-10 anos
- Animações e sons para engajamento
- Progressão de dificuldade gradual
- Código limpo e autodocumentado
- Mobile-first responsive design
- Sem dependências externas (exceto AWS CLI)

## 🔧 Como Usar o MCP

| Ação | Tool MCP |
|------|----------|
| Identificar contexto de arquivo | `identify_context` |
| Listar contratos | `get_contracts` |
| Validar implementação | `validate_contract` |
| Verificar docs existentes | `check_existing_documentation` |
| Registrar padrão | `learn_pattern` |
| Adicionar decisão | `add_decision` |
| Registrar feature | `register_feature` |

## 📚 Acesso Rápido ao Contexto

Use o prompt MCP `project-context` para obter:
- Contratos críticos do projeto
- Padrões aprendidos
- Decisões arquiteturais
- Guidelines globais

## 🚫 Regras

- ❌ Nunca criar documentação sem verificar duplicação
- ❌ Nunca modificar contratos sem validar implementações
- ❌ Nunca fazer decisões sem registrá-las
- ✅ Sempre consultar MCP antes de mudanças significativas

---
**Projeto**: isabella-website | **MCP**: project-docs
