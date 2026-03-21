# Reforço Inglês - Lesson 1 (A Book)

Microsite estático em HTML + CSS + JavaScript (Vanilla) para reforço de inglês infantil.

## Escopo

Este módulo usa somente o conteúdo da Lesson 1:

* Vocabulário: book, notepad, boy, girl, car, dinosaur, binder, folder, highlighter
* Estruturas: Hi., Hey., Come in., What’s this?, It’s a surprise., Is it a book?, Yes, it is., No, it’s not., Is it about cars?, It’s a book about cars., Oh! It’s about dinosaurs!, Thanks a lot., You’re welcome.

## Telas implementadas

* Home
* Vocabulary
* What’s this?
* Is it a...?
* About cars / dinosaurs
* Dialogue
* Chant
* Final Quiz

## Estrutura

```text
reforco-ingles-lesson1/
├── index.html
├── 404.html
├── README.md
├── css/
│   ├── styles.css
│   └── animations.css
└── js/
    ├── app.js
    ├── router.js
    ├── data.js
    ├── audio.js
    ├── state.js
    ├── components.js
    └── screens/
        ├── home.js
        ├── vocabulary.js
        ├── whats-this.js
        ├── yes-no.js
        ├── about.js
        ├── dialogue.js
        ├── chant.js
        └── final-quiz.js
```

## Executar localmente

Na raiz do repositório:

```bash
python3 -m http.server 8000
```

Acesse:

* `http://localhost:8000/reforco-ingles-lesson1/index.html#/home`

## Deploy S3 (estático)

Dentro da pasta do módulo:

```bash
aws s3 sync . s3://SEU-BUCKET/reforco-ingles-lesson1/ --acl public-read
```

Para atualizar removendo arquivos antigos no destino:

```bash
aws s3 sync . s3://SEU-BUCKET/reforco-ingles-lesson1/ --acl public-read --delete
```
