# 🚀 Lógica de Programação para Crianças

Site educacional interativo para ensinar lógica de programação para crianças de 8 a 10 anos.

## 📋 Conteúdo

### 6 Tópicos Educacionais:

1. 🎯 **Sequências e Ordem** - Entenda que a ordem importa
2. 🔄 **Padrões e Repetições** - Descubra padrões escondidos
3. 🤔 **Decisões (Se... Então...)** - Tome decisões inteligentes
4. 🔁 **Loops (Fazer Várias Vezes)** - Repita ações eficientemente
5. 📝 **Algoritmos (Receitas)** - Crie passo a passo para resolver problemas
6. 🐛 **Encontrar e Corrigir Erros (Debug)** - Seja um detetive de bugs

### 5 Jogos Interativos:

1. 🎯 **Quiz das Sequências** - Drag and drop para ordenar passos
2. 🔄 **Jogo dos Padrões** - Complete padrões visuais
3. 🤔 **Labirinto das Decisões** - História interativa com escolhas
4. 🔁 **Desafio dos Loops** - Programe um robô com comandos
5. 🐛 **Debug do Detetive** - Encontre erros em algoritmos

## 🎨 Características

* ✨ Design colorido e atraente para crianças
* 🎬 Animações suaves e interativas
* 🎵 Efeitos sonoros usando Web Audio API
* 📱 Layout 100% responsivo
* 🎉 Sistema de confetes para comemorações
* 💾 Progresso salvo no localStorage
* 🖼️ Ilustrações SVG customizadas
* 🎮 Jogos totalmente interativos

## 📁 Estrutura do Projeto

```
logica-programacao-kids/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos globais e animações
├── js/
│   └── main.js           # JavaScript principal com utilitários
├── topicos/              # Páginas de conteúdo educacional
│   ├── sequencias.html
│   ├── padroes.html
│   ├── decisoes.html
│   ├── loops.html
│   ├── algoritmos.html
│   └── debug.html
└── jogos/                # Jogos interativos
    ├── quiz-sequencias.html
    ├── jogo-padroes.html
    ├── labirinto-decisoes.html
    ├── desafio-loops.html
    └── debug-detetive.html
```

## 🚀 Deploy no AWS S3

### Pré-requisitos

* Conta AWS ativa
* AWS CLI instalado (opcional, mas recomendado)
* Bucket S3 criado

### Passo 1: Criar o Bucket S3

1. Acesse o console AWS: https://console.aws.amazon.com/s3/
2. Clique em **"Criar bucket"**
3. Configure o bucket:
   - **Nome do bucket**: `logica-programacao-kids` (ou nome de sua escolha)
   - **Região**: Escolha a mais próxima (ex: `us-east-1` ou `sa-east-1` )
   - **Desmarque** "Bloquear todo o acesso público"
   - Aceite o aviso sobre tornar o bucket público

### Passo 2: Habilitar Hospedagem de Site Estático

1. Selecione seu bucket criado
2. Vá para a aba **"Propriedades"**
3. Role até **"Hospedagem de site estático"**
4. Clique em **"Editar"**
5. Configure:
   - **Hospedagem de site estático**: Habilitado
   - **Tipo de hospedagem**: Hospedagem de site estático
   - **Documento de índice**: `index.html`

   - **Documento de erro**: `index.html` (opcional)
6. Clique em **"Salvar alterações"**
7. **Anote a URL do endpoint** que aparece (exemplo: `http://logica-programacao-kids.s3-website-us-east-1.amazonaws.com`)

### Passo 3: Configurar Política de Bucket (Tornar Público)

1. Na aba **"Permissões"** do bucket
2. Role até **"Política do bucket"**
3. Clique em **"Editar"**
4. Cole a seguinte política (substitua `SEU-NOME-DO-BUCKET` pelo nome real):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::SEU-NOME-DO-BUCKET/*"
        }
    ]
}
```

5. Clique em **"Salvar alterações"**

### Passo 4: Upload dos Arquivos

#### Opção A: Via Console AWS (Interface Gráfica)

1. Na aba **"Objetos"** do bucket
2. Clique em **"Carregar"**
3. Clique em **"Adicionar arquivos"** e **"Adicionar pasta"**
4. Selecione TODOS os arquivos e pastas do projeto:
   - `index.html`

   - Pasta `css/`

   - Pasta `js/`

   - Pasta `topicos/`

   - Pasta `jogos/`

5. Clique em **"Carregar"**
6. Aguarde o upload completar

#### Opção B: Via AWS CLI (Linha de Comando)

```bash
# Navegue até a pasta do projeto
cd /caminho/para/logica-programacao-kids

# Sincronize todos os arquivos com o bucket
aws s3 sync . s3://SEU-NOME-DO-BUCKET --acl public-read

# Ou faça upload de uma vez
aws s3 cp . s3://SEU-NOME-DO-BUCKET --recursive --acl public-read
```

### Passo 5: Testar o Site

1. Acesse a URL do endpoint anotada no Passo 2
2. Exemplo: `http://logica-programacao-kids.s3-website-us-east-1.amazonaws.com`
3. O site deve estar funcionando perfeitamente!

### Configurações Opcionais

#### Adicionar Domínio Customizado (Opcional)

1. Registre um domínio no Route 53 ou outro registrador
2. Configure o Route 53 para apontar para o bucket S3
3. Adicione um certificado SSL/TLS usando AWS Certificate Manager
4. Configure CloudFront para HTTPS

#### Habilitar CloudFront (CDN - Opcional mas Recomendado)

1. Acesse o console CloudFront: https://console.aws.amazon.com/cloudfront/
2. Crie uma nova distribuição:
   - **Origin Domain**: Selecione seu bucket S3
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Default Root Object**: `index.html`

3. Aguarde a distribuição ser criada (15-20 minutos)
4. Acesse pelo domínio CloudFront para melhor performance

## 🔧 Manutenção e Atualizações

### Atualizar Conteúdo

Para atualizar o site após mudanças:

```bash
# Via AWS CLI
aws s3 sync . s3://SEU-NOME-DO-BUCKET --acl public-read --delete

# O flag --delete remove arquivos do S3 que não existem mais localmente
```

### Limpar Cache do CloudFront (se estiver usando)

```bash
aws cloudfront create-invalidation --distribution-id SEU-ID-DISTRIBUICAO --paths "/*"
```

## 💰 Custos Estimados

* **S3 Storage**: ~$0.023 por GB/mês (projeto tem ~1-2MB)
* **S3 Requests**: ~$0.0004 por 1000 requisições GET
* **Transferência de Dados**: ~$0.09 por GB (primeiros 10 TB)
* **Custo mensal estimado**: Menos de $1 para uso educacional pequeno/médio

## 🔒 Segurança

* ✅ Site é 100% estático (HTML/CSS/JS)
* ✅ Não coleta dados pessoais
* ✅ Não requer autenticação
* ✅ Seguro para crianças
* ✅ Progresso salvo apenas no navegador local

## 📱 Compatibilidade

* ✅ Chrome, Firefox, Safari, Edge (versões recentes)
* ✅ Tablets e iPads
* ✅ Smartphones (design responsivo)
* ⚠️ Internet Explorer não é suportado

## 🎓 Uso Educacional

Este conteúdo é ideal para:
* 👨‍🏫 Professores de informática
* 👨‍👩‍👧‍👦 Pais ensinando em casa
* 🏫 Escolas de programação para crianças
* 📚 Bibliotecas e espaços maker
* 🎮 Clubes de robótica e programação

## 📄 Licença

Este projeto educacional é de código aberto. Sinta-se livre para usar, modificar e compartilhar!

## 🤝 Contribuições

Sugestões de melhorias são bem-vindas:
* Mais jogos interativos
* Novos tópicos
* Traduções para outros idiomas
* Melhorias de acessibilidade

## 📞 Suporte

Para dúvidas sobre o conteúdo educacional ou problemas técnicos, consulte:
* Documentação AWS S3: https://docs.aws.amazon.com/s3/
* Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

**Feito com 💖 para crianças curiosas e criativas!** ✨

Divirta-se aprendendo lógica de programação! 🚀🎮
