# Prompt para Agent de AI Implementador – Lesson 2

Você vai implementar um **site estático educacional** em **HTML, CSS e JavaScript vanilla**, com foco em **reforço escolar de inglês para criança de 9 anos**.

## Objetivo
Criar um microsite interativo baseado **exclusivamente** no conteúdo visível nas imagens da **Lesson 2**, com foco em:
- natação;
- profissões com `instructor`;
- animais de pet shop;
- contagem de `one` a `six`;
- pequenos diálogos.

## Regra principal de escopo
Você **não pode inventar conteúdo novo fora da lição**. Use somente o conteúdo abaixo.

### Vocabulário permitido
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

### Estruturas permitidas
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
- Thanks, John.
- You’re welcome.

### Personagens e nomes permitidos
- Phil
- Fred
- Sam
- Kelly
- Liz
- Mrs. Wilson
- Bob
- Carol
- John

## Restrições técnicas
- usar somente HTML, CSS e JavaScript vanilla;
- não exigir backend;
- compatível com hospedagem estática;
- preferir hash routing;
- priorizar mobile first;
- usar animações leves em CSS;
- garantir boa performance;
- implementar acessibilidade básica.

## Entregáveis esperados
1. Estrutura completa do projeto.
2. `index.html` funcional.
3. Arquivos CSS organizados.
4. Arquivos JS modulares.
5. `data.js` centralizando conteúdo.
6. Telas:
   - Home
   - Words First
   - Are you a...?
   - Swimming Class
   - Pet Shop Story
   - Counting
   - What is it?
   - Final Quiz
7. `404.html`.
8. README com instruções de execução local e hospedagem estática.

## Requisitos pedagógicos obrigatórios
- linguagem visual infantil, limpa e amigável;
- pouco texto por tela;
- feedback positivo imediato;
- interação baseada em clicar, ouvir e responder;
- reforço por repetição;
- progressão do simples para o composto.

## Requisitos de UX
- botões grandes;
- tipografia legível;
- alto contraste;
- suporte a celular;
- progresso visual;
- navegação simples.

## Mecânicas obrigatórias
### 1. Vocabulary cards
Cada palavra deve ter:
- imagem
- label
- áudio ou speech synthesis

### 2. Quiz “Are you a...?”
- imagem + pergunta
- respostas `Yes, I am` e `No, I’m not`

### 3. Scene “Swimming Class”
- falas curtas em sequência
- repetição com áudio
- foco em `tired`, `fine` e `laps`

### 4. Activity “Pet Shop Story”
- pergunta `What’s wrong?`
- problema `One kitten is missing`
- descoberta sob a cushion

### 5. Counting activity
- imagens com grupos
- contagem de `one` a `six`

### 6. Quiz “What is it?”
- imagem + opções
- respostas como `It’s a puppy` e `It’s a gerbil`

### 7. Final quiz
- mistura dos conteúdos anteriores
- score e feedback final

## Diretrizes de implementação
- criar componentes reutilizáveis mesmo em JS vanilla;
- separar renderização de dados;
- evitar textos hardcoded espalhados;
- usar `localStorage` se necessário para progresso;
- comentar apenas trechos importantes;
- manter o escopo preso ao conteúdo da lição.

## Critério de sucesso
O site estará pronto quando uma criança conseguir navegar sozinha, revisar o vocabulário principal, responder atividades simples, acompanhar a história do pet shop e completar a contagem e o quiz final em um celular, sem backend.
