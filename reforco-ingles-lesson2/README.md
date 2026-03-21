# Reforco Ingles - Lesson 2 (Swimming Class and Pet Shop)

Microsite estatico em HTML + CSS + JavaScript vanilla para reforco de ingles infantil.

## Escopo

Este modulo usa somente o conteudo da Lesson 2:

* Vocabulário: man, woman, swimming instructor, judo instructor, riding instructor, ski instructor, cat, kitten, dog, puppy, gerbil, pet shop, cushion, one, two, three, four, five, six
* Estruturas: Are you tired?, Yes, I am., I'm not tired. I'm fine., What about you?, Come on, boys. Two more laps., Hi, Kelly. How are you?, I'm kind of upset., What's wrong?, One kitten is missing., Calm down. Let's look for it., Look! It's here, under this cushion., Are you a swimming instructor?, Yes, I am., No, I'm not., What is it?, It's a puppy., It's a gerbil., Is it a pet shop?, Yes, it is.

## Telas implementadas

* Home
* Words First
* Are you a...?
* Swimming Class
* Pet Shop Story
* Counting
* What's this?
* Final Quiz

## Estrutura

```text
reforco-ingles-lesson2/
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
        ├── words-first.js
        ├── instructors.js
        ├── swimming-class.js
        ├── pet-shop.js
        ├── counting.js
        ├── whats-this.js
        └── final-quiz.js
```

## Executar localmente

Na raiz do repositório:

```bash
python3 -m http.server 8000
```

Acesse:

* `http://localhost:8000/reforco-ingles-lesson2/index.html#/home`

## Publicacao

O deploy atual do repositório já publica o conteúdo estático inteiro via Terraform para o bucket privado usado pelo CloudFront. Depois de incluir os arquivos no repositório, basta reaplicar o Terraform ou executar o fluxo operacional padrão do projeto.
