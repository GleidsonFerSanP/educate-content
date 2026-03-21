# Plano de Implementação – Site Estático em HTML + JavaScript para Lesson 2

## 1. Objetivo do projeto
Construir um **site estático de reforço escolar** para uma criança de 9 anos, baseado **exclusivamente** no conteúdo visível nas imagens da **Lesson 2**.

O site deve ser:
- leve;
- visual;
- responsivo para celular e tablet;
- fácil de hospedar de forma estática;
- sem backend obrigatório;
- apropriado para uso rápido em casa ou no celular.

---

## 2. Escopo pedagógico permitido
O sistema deve usar somente conteúdos que aparecem nas imagens.

### Vocabulário principal
- man
- woman
- swimming instructor
- judo instructor
- riding instructor
- ski instructor
- cat
- kitten
- dog
- puppy
- gerbil
- pet shop
- cushion
- one
- two
- three
- four
- five
- six

### Frases e estruturas
- Are you tired?
- Yes, I am.
- I’m not tired. I’m fine.
- What about you?
- Come on, boys. Two more laps.
- Come on, Sam. One more lap.
- Come on, girls. Four more laps.
- Hi, Kelly. How are you?
- I’m kind of upset.
- What’s wrong?
- One kitten is missing.
- Calm down. Let’s look for it.
- Look! It’s here, under this cushion.
- Are you a judo instructor?
- Are you a riding instructor?
- Are you a ski instructor?
- Are you a swimming instructor?
- Yes, I am.
- No, I’m not.
- What is it?
- It’s a puppy.
- It’s a gerbil.
- Is it a pet shop?
- Yes, it is.

### Nomes presentes nas imagens
- Phil
- Fred
- Sam
- Kelly
- Liz
- Mrs. Wilson
- Bob
- Carol
- John

Não adicionar novos temas, animais, profissões ou estruturas gramaticais fora disso.

---

## 3. Arquitetura técnica sugerida

## Stack
- **HTML5**
- **CSS3**
- **JavaScript vanilla**

## Hospedagem
- site estático compatível com S3 + CloudFront

## Produção
- manter URLs simples;
- evitar dependências externas;
- permitir navegação por hash para funcionar bem em hosting estático.

---

## 4. Estrutura de pastas sugerida

```text
lesson2-site/
  index.html
  /assets
    /images
      man.png
      woman.png
      swimming-instructor.png
      judo-instructor.png
      riding-instructor.png
      ski-instructor.png
      cat.png
      kitten.png
      dog.png
      puppy.png
      gerbil.png
      pet-shop.png
      cushion.png
      pool-scene.png
      pet-shop-scene.png
    /audio
      are-you-tired.mp3
      yes-i-am.mp3
      im-not-tired-im-fine.mp3
      whats-wrong.mp3
      one-kitten-is-missing.mp3
      calm-down-lets-look-for-it.mp3
      look-its-here.mp3
      numbers-1-6.mp3
    /icons
      star.svg
      speaker.svg
      paw.svg
      water-drop.svg
  /css
    styles.css
    animations.css
  /js
    app.js
    router.js
    data.js
    audio.js
    state.js
    components.js
    screens/
      home.js
      words-first.js
      swimming-class.js
      instructors.js
      pet-shop.js
      counting.js
      whats-this.js
      final-quiz.js
  404.html
```

---

## 5. Módulos funcionais

## 5.1. Home
### Objetivo
Receber a criança e apresentar a lição.

### Requisitos
- título da lição;
- botão **Start**;
- visual infantil;
- indicação curta do tema: natação, animais e números.

### Critério de aceite
- ao clicar em **Start**, o usuário vai para a primeira tela de vocabulário.

---

## 5.2. Words First
### Objetivo
Apresentar o vocabulário visual principal.

### Requisitos
- cards com imagem + palavra + áudio;
- navegação simples;
- categorias leves:
  - people
  - instructors
  - pet shop animals
  - numbers

### Critério de aceite
- a criança consegue percorrer todas as palavras principais sem sair da tela.

---

## 5.3. Game: Are you a...?
### Objetivo
Treinar profissões e respostas curtas.

### Requisitos
- mostrar um personagem;
- exibir pergunta como **Are you a judo instructor?**;
- permitir resposta com:
  - **Yes, I am.**
  - **No, I’m not.**

### Critério de aceite
- o jogo suporta perguntas corretas e incorretas com feedback imediato.

---

## 5.4. Swimming Class
### Objetivo
Trabalhar o diálogo da piscina.

### Requisitos
- exibir a cena da natação;
- apresentar falas curtas em sequência;
- permitir tocar áudio por fala;
- incluir a ideia de **laps** e **tired / fine**.

### Critério de aceite
- a criança acompanha e repete o mini diálogo completo.

---

## 5.5. Pet Shop Story
### Objetivo
Trabalhar compreensão de problema e solução.

### Requisitos
- exibir narrativa curta do pet shop;
- usar as frases:
  - **How are you?**
  - **What’s wrong?**
  - **One kitten is missing.**
  - **Calm down. Let’s look for it.**
  - **Look! It’s here, under this cushion.**
- incluir uma mecânica simples de procurar o kitten.

### Critério de aceite
- ao final, a criança encontra o kitten e recebe feedback positivo.

---

## 5.6. Counting Screen
### Objetivo
Revisar números de one a six.

### Requisitos
- apresentar grupos de animais e objetos;
- pedir contagem;
- reforçar escrita simples:
  - **two cushions**
  - **four gerbils**
  - **five cats**
  - **six dogs**

### Critério de aceite
- a criança conclui pelo menos 4 rodadas de contagem.

---

## 5.7. What is it?
### Objetivo
Treinar identificação de animais e lugares.

### Requisitos
- exibir 1 imagem por rodada;
- apresentar 3 opções;
- usar respostas como:
  - **It’s a puppy.**
  - **It’s a gerbil.**
  - **It’s a pet shop.**

### Critério de aceite
- o usuário completa as rodadas com feedback imediato.

---

## 5.8. Final Quiz
### Objetivo
Misturar vocabulário, contagem e diálogos curtos.

### Requisitos
- perguntas de múltipla escolha;
- perguntas de sim/não;
- uma etapa de contagem;
- score final com reforço positivo.

### Critério de aceite
- ao final, o usuário vê pontuação e botão **Replay**.

---

## 6. Requisitos de UX
- botões grandes;
- pouco texto por tela;
- leitura simples;
- áudio opcional;
- feedback imediato;
- visual amigável;
- bom uso em celular.

---

## 7. Requisitos pedagógicos
- reforço por repetição;
- progressão do simples para o composto;
- imagens sempre acompanhadas de palavra ou fala;
- respostas curtas e previsíveis;
- foco em confiança e reconhecimento.

---

## 8. Critérios de sucesso
O site estará pronto quando a criança conseguir:
- revisar o vocabulário principal;
- responder perguntas com **Yes, I am** e **No, I’m not**;
- entender o mini problema do pet shop;
- contar figuras até seis;
- navegar sozinha em um celular sem backend.
