# 🚀 GUIA RÁPIDO DE DEPLOY - AWS S3

## ⚡ Deploy em 5 Passos

### 1️⃣ Criar Bucket S3

```
- Acesse: https://console.aws.amazon.com/s3/
- Clique em "Criar bucket"
- Nome: logica-programacao-kids (ou outro de sua escolha)
- Região: sa-east-1 (São Paulo) ou us-east-1
- ⚠️ IMPORTANTE: Desmarque "Bloquear todo o acesso público"
```

### 2️⃣ Habilitar Hospedagem de Site

```
- Selecione o bucket → aba "Propriedades"
- Role até "Hospedagem de site estático"
- Habilitar
- Documento de índice: index.html
- Salvar
- 📝 ANOTE A URL DO ENDPOINT!
```

### 3️⃣ Tornar Bucket Público

```
- Aba "Permissões" → "Política do bucket"
- Cole a política abaixo (substitua SEU-BUCKET):
```

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::SEU-BUCKET/*"
        }
    ]
}
```

### 4️⃣ Upload dos Arquivos

**Opção A - Console AWS (Mais Fácil):**

```
- Aba "Objetos" → "Carregar"
- Arraste TODA a pasta logica-programacao-kids
- Ou selecione todos os arquivos e pastas
- Clique em "Carregar"
- Aguarde finalizar
```

**Opção B - AWS CLI (Mais Rápido):**

```bash
cd logica-programacao-kids
aws s3 sync . s3://SEU-BUCKET --acl public-read
```

### 5️⃣ Acessar o Site

```
Acesse a URL do endpoint anotada no passo 2
Exemplo: http://logica-programacao-kids.s3-website-sa-east-1.amazonaws.com
```

## ✅ Checklist Final

* [ ] Bucket S3 criado
* [ ] Acesso público habilitado
* [ ] Hospedagem de site estática ativada
* [ ] Política de bucket configurada
* [ ] Todos os arquivos carregados
* [ ] Site acessível pela URL

## 📁 Arquivos que Devem Ser Carregados

```
logica-programacao-kids/
├── index.html ✅
├── README.md ✅
├── css/
│   └── styles.css ✅
├── js/
│   └── main.js ✅
├── topicos/
│   ├── sequencias.html ✅
│   ├── padroes.html ✅
│   ├── decisoes.html ✅
│   ├── loops.html ✅
│   ├── algoritmos.html ✅
│   └── debug.html ✅
└── jogos/
    ├── quiz-sequencias.html ✅
    ├── jogo-padroes.html ✅
    ├── labirinto-decisoes.html ✅
    ├── desafio-loops.html ✅
    └── debug-detetive.html ✅
```

## 🔄 Atualizar Conteúdo Depois

```bash
aws s3 sync . s3://SEU-BUCKET --acl public-read --delete
```

## 💰 Custo Estimado

* **Gratuito** no primeiro ano (AWS Free Tier)
* Depois: ~$0.50 - $2.00/mês para uso educacional
* Tráfego baixo: praticamente gratuito

## ⚠️ Problemas Comuns

**Site não abre:**
* Verifique se a política do bucket está configurada
* Confirme que "Hospedagem de site estático" está habilitada
* Use a URL do endpoint, não a URL do bucket

**Arquivos não encontrados (404):**
* Verifique se todos os arquivos foram carregados
* Confirme que a estrutura de pastas está correta
* Links devem usar caminhos relativos

**CSS/JS não carrega:**
* Verifique se as pastas css/ e js/ foram carregadas
* Abra o console do navegador (F12) para ver erros

## 🎉 Pronto!

Seu site educacional está no ar! 🚀

Compartilhe a URL com:
* 👨‍🏫 Professores
* 👨‍👩‍👧‍👦 Pais
* 🏫 Escolas
* 👧👦 Crianças curiosas!

---

📞 Precisa de ajuda? Consulte o README.md completo.
