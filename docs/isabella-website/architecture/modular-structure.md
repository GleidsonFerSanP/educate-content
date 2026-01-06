# Arquitetura Modular - 3 M\u00f3dulos Educacionais

## Resumo

Documenta a arquitetura modular do projeto com 3 módulos educacionais independentes: Lógica Programação Kids, Portugol Kids e Tutorial WhatsApp. Cada módulo tem estrutura própria (HTML, CSS, JS, jogos/tópicos) e deploy independente no S3.

## Contexto

* **Contexto**: general
* **Tipo**: architecture
* **Tópicos**: estrutura de diretórios, modularização, independência entre módulos, deploy S3, organização de assets

## Conteúdo

### Visão Geral

O projeto Isabella Website é composto por **3 módulos educacionais independentes**, cada um com sua própria estrutura de arquivos, temas visuais e jogos específicos. Todos compartilham os mesmos princípios de design (Vanilla JS, gamificação, público 8-10 anos).

### Estrutura de Diretórios

```
isabella/website/
├── logica-programacao-kids/     # Módulo 1: Lógica de Programação
│   ├── index.html               # Landing page (tema roxo/azul)
│   ├── css/styles.css           # Estilos globais do módulo
│   ├── js/main.js               # Utilidades compartilhadas
│   ├── topicos/                 # 6 páginas teóricas
│   │   ├── sequencias.html
│   │   ├── decisoes.html
│   │   ├── loops.html
│   │   ├── padroes.html
│   │   ├── debug.html
│   │   └── algoritmos.html
│   └── jogos/                   # 5 jogos interativos
│       ├── quiz-sequencias.html
│       ├── labirinto-decisoes.html
│       ├── desafio-loops.html
│       ├── jogo-padroes.html
│       └── debug-detetive.html
│
├── portugol-kids/               # Módulo 2: Portugol Kids
│   ├── index.html               # Landing page (tema roxo)
│   ├── css/styles.css
│   ├── js/main.js
│   ├── topicos/                 # 7 páginas teóricas
│   │   ├── introducao.html
│   │   ├── variaveis.html
│   │   ├── entrada-saida.html
│   │   ├── operadores.html
│   │   ├── decisoes.html
│   │   ├── repeticoes.html
│   │   └── tutorial-portugol-studio.html
│   └── jogos/                   # 5 jogos interativos
│       ├── monte-programa.html
│       ├── caca-erros.html
│       ├── calculadora-magica.html
│       ├── labirinto-decisoes.html
│       └── robo-repetidor.html
│
└── tutorial-whatsapp-windows/   # Módulo 3: Tutorial WhatsApp
    ├── index.html               # Tutorial 5 passos (tema verde)
    └── css/styles.css
```

### Características dos Módulos

#### 1. Lógica Programação Kids

* **Objetivo:** Introduzir conceitos básicos de lógica de programação sem sintaxe específica
* **Tema:** Roxo (#7C3AED) + Azul (#3B82F6)
* **Estrutura:** 6 tópicos + 5 jogos
* **Deploy:** S3 root
* **URL:** https://chatgpt-actions-file-uploads.s3.us-east-1.amazonaws.com/index.html

#### 2. Portugol Kids

* **Objetivo:** Ensinar programação em Portugol (sintaxe real)
* **Tema:** Roxo (#6B46C1) + Rosa (#9333EA)
* **Estrutura:** 7 tópicos + 5 jogos + tutorial IDE
* **Deploy:** S3 `/portugol-kids/`
* **URL:** https://chatgpt-actions-file-uploads.s3.us-east-1.amazonaws.com/portugol-kids/index.html

#### 3. Tutorial WhatsApp Windows

* **Objetivo:** Ensinar instalação do WhatsApp Desktop
* **Tema:** Verde (#25D366)
* **Estrutura:** 1 página com 5 passos + checklist
* **Deploy:** S3 `/tutorial-whatsapp/`
* **URL:** https://chatgpt-actions-file-uploads.s3.us-east-1.amazonaws.com/tutorial-whatsapp/index.html

### Independência Entre Módulos

**Vantagens:**
1. Deploy independente por módulo
2. Temas visuais distintos
3. Reutilização de padrões (não de código)
4. Escalabilidade sem refatoração

**Assets NÃO Compartilhados:**
* CSS: Cada módulo tem `styles.css` próprio
* JS: Cada `main.js` é independente
* Duplicação intencional de utilidades (tocarSom, feedback, confetes)

### Padrões Replicados

1. **Estrutura de Jogo:** `.jogo-container` → `.painel-info` → `.area-jogo` → `.botoes-acao`
2. **Sistema de Feedback:** `mostrarFeedback()` + overlay
3. **Web Audio API:** `tocarSom(frequencia, duracao)`
4. **LocalStorage:** Progresso do jogador
5. **Animações CSS:** @keyframes para celebrações

### Deployment

```bash
# Módulo 1 (root)
cd logica-programacao-kids
aws s3 sync . s3://chatgpt-actions-file-uploads/ --exclude ".DS_Store"

# Módulo 2
cd portugol-kids
aws s3 sync . s3://chatgpt-actions-file-uploads/portugol-kids/ --exclude ".DS_Store"

# Módulo 3
cd tutorial-whatsapp-windows
aws s3 sync . s3://chatgpt-actions-file-uploads/tutorial-whatsapp/ --exclude ".DS_Store"
```

### Métricas

| Módulo                    | HTML | CSS Lines | JS Lines | Jogos | Tópicos |
|---------------------------|------|-----------|----------|-------|---------|
| Lógica Programação Kids   | 14   | ~800      | ~500     | 5     | 6       |
| Portugol Kids             | 15   | ~680      | ~450     | 5     | 7       |
| Tutorial WhatsApp         | 2    | ~300      | ~50      | 0     | 1       |
| **TOTAL**                 | **31** | **~1780** | **~1000** | **10** | **14** |

## Referências

---
*Documento gerado automaticamente pelo MCP*
