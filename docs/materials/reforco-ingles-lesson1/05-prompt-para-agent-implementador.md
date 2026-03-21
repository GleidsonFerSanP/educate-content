# Prompt para Agent de AI Implementador

Você vai implementar um **site estático educacional** em **HTML, CSS e JavaScript vanilla**, com foco em **reforço escolar de inglês para criança de 9 anos**.

## Objetivo
Criar um microsite interativo baseado **exclusivamente** na **Lesson 1 – A Book** de um material didático já ensinado.

## Regra principal de escopo
Você **não pode inventar conteúdo novo fora da lição**. Use somente o conteúdo abaixo.

### Vocabulário permitido
- book
- notepad
- boy
- girl
- car
- dinosaur
- binder
- folder
- highlighter

### Estruturas permitidas
- Hi.
- Hey.
- Come in.
- What’s this?
- It’s a surprise.
- Is it a book?
- Yes, it is.
- No, it’s not.
- Is it about cars?
- It’s a book about cars.
- Oh! It’s about dinosaurs!
- Thanks a lot.
- You’re welcome.

### Personagens e nomes permitidos
- Mike
- Grandpa
- Bob
- Rachel
- John
- Justin
- Mary

## Restrições técnicas
- usar somente HTML, CSS e JavaScript vanilla;
- não exigir backend;
- compatível com hospedagem em AWS S3;
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
   - Vocabulary
   - What’s this?
   - Is it a...?
   - About cars / dinosaurs
   - Dialogue
   - Chant
   - Final Quiz
7. `404.html`.
8. README com instruções de execução local e deploy no S3.

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

### 2. Quiz “What’s this?”
- imagem + 3 opções
- feedback visual imediato

### 3. Quiz “Is it a...?”
- imagem + pergunta
- respostas Yes/No

### 4. Activity “about cars / dinosaurs”
- pergunta sobre o assunto do livro
- revelação final

### 5. Dialogue screen
- falas em sequência
- possibilidade de tocar áudio por linha

### 6. Final quiz
- mistura dos conteúdos anteriores
- score e feedback final

## Diretrizes de implementação
- criar componentes reutilizáveis mesmo em JS vanilla;
- separar renderização de dados;
- evitar textos hardcoded espalhados;
- usar `localStorage` se necessário para progresso;
- comentar trechos importantes do código.

## Critério de sucesso
O site estará pronto quando uma criança conseguir navegar sozinha, rever o vocabulário, responder atividades e praticar o diálogo da lição em um celular, sem backend, com deploy simples em S3.
