# Plano de Implementação – Site Estático em HTML + JavaScript para AWS S3

## 1. Objetivo do projeto
Construir um **site estático de reforço escolar** para uma criança de 9 anos, baseado **exclusivamente** no conteúdo da **Lesson 1 – A Book** mostrado nas imagens.

O site deve ser:
- leve;
- visual;
- responsivo para celular e tablet;
- fácil de hospedar em **AWS S3**;
- sem backend obrigatório;
- com possibilidade de uso offline parcial no navegador.

---

## 2. Escopo pedagógico permitido
O sistema deve usar **somente** estes conteúdos:

### Vocabulário
- book
- notepad
- boy
- girl
- car
- dinosaur
- binder
- folder
- highlighter

### Frases e estruturas
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

### Nomes presentes nas imagens
- Mike
- Grandpa
- Bob
- Rachel
- John
- Justin
- Mary

Não adicionar novos temas, novos objetos ou novas estruturas gramaticais fora disso.

---

## 3. Arquitetura técnica sugerida

## Stack
- **HTML5**
- **CSS3**
- **JavaScript vanilla**

## Hospedagem
- **Amazon S3** com static website hosting

## Opcional de produção
- **CloudFront** para CDN
- **Route 53** para domínio
- **AWS Certificate Manager** se usar HTTPS via CloudFront

---

## 4. Estrutura de pastas sugerida

```text
lesson1-site/
  index.html
  /assets
    /images
      book.png
      notepad.png
      boy.png
      girl.png
      car.png
      dinosaur.png
      binder.png
      folder.png
      highlighter.png
      scene-grandpa-mike-1.png
      scene-grandpa-mike-2.png
    /audio
      book.mp3
      notepad.mp3
      boy.mp3
      girl.mp3
      car.mp3
      dinosaur.mp3
      binder.mp3
      folder.mp3
      highlighter.mp3
      whats-this.mp3
      yes-it-is.mp3
      no-its-not.mp3
      thanks-a-lot.mp3
      youre-welcome.mp3
    /icons
      star.svg
      speaker.svg
      correct.svg
      wrong.svg
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
      vocabulary.js
      whats-this.js
      yes-no.js
      about.js
      dialogue.js
      chant.js
      final-quiz.js
  404.html
```

---

## 5. Módulos funcionais

## 5.1. Home
### Objetivo
Receber a criança de forma amigável.

### Requisitos
- título da lição: **Lesson 1 – A Book**;
- botão **Start**;
- visual infantil e limpo;
- personagem ou ícone animado com aceno;
- breve instrução em português para o adulto e em inglês simples para a criança.

### Critério de aceite
- ao clicar em **Start**, o usuário vai para a tela de vocabulário.

---

## 5.2. Vocabulary Screen
### Objetivo
Apresentar as 9 palavras da lição.

### Requisitos
- exibir um card por item;
- cada card contém imagem + palavra + botão de áudio;
- efeito de destaque ao clicar;
- navegação por setas ou swipe.

### Interações
- clicar no card reproduz a pronúncia;
- botão “Next” leva para atividade prática.

### Critério de aceite
- todas as 9 palavras podem ser navegadas e reproduzidas.

---

## 5.3. Game: What’s this?
### Objetivo
Treinar reconhecimento visual com múltipla escolha.

### Requisitos
- mostrar 1 imagem por rodada;
- apresentar 3 opções de resposta;
- ao selecionar, dar feedback imediato.

### Feedback correto
- animação de estrela;
- mensagem curta: **Great! It’s a car.**

### Feedback incorreto
- mensagem curta: **Let’s try again!**
- manter a mesma rodada até acerto ou permitir nova tentativa.

### Critério de aceite
- o usuário completa pelo menos 9 rodadas.

---

## 5.4. Game: Is it a...?
### Objetivo
Treinar perguntas com resposta de sim ou não.

### Requisitos
- imagem + pergunta do tipo **Is it a binder?**;
- dois botões:
  - **Yes, it is.**
  - **No, it’s not.**
- sistema de pontuação simples.

### Critério de aceite
- suportar perguntas corretas e incorretas para a mesma imagem.

---

## 5.5. Game: About cars / about dinosaurs
### Objetivo
Treinar compreensão da palavra **about**.

### Requisitos
- mostrar a cena do livro;
- perguntar: **Is it about cars?**;
- a criança responde;
- depois mostrar a revelação:
  - **No, it’s not.**
  - **Oh! It’s about dinosaurs!**

### Critério de aceite
- a mecânica de revelação deve ser clara e divertida.

---

## 5.6. Dialogue Player
### Objetivo
Praticar o diálogo principal da lição.

### Requisitos
- balões de fala em sequência;
- botão de áudio em cada linha;
- modo “read with me” para destacar frase por frase;
- modo “roleplay” com dois personagens.

### Diálogo base
- Hi, Mike.
- Hey, Grandpa. Come in.
- What’s this?
- It’s a surprise.
- Is it a book?
- Yes, it is.
- Is it about cars?
- No, it’s not.
- Oh! It’s about dinosaurs!
- Thanks a lot, Grandpa.
- You’re welcome, Mike.

### Critério de aceite
- todas as frases podem ser visualizadas e reproduzidas.

---

## 5.7. Chant / Song Screen
### Objetivo
Reforçar memorização por ritmo.

### Requisitos
- exibir a letra da parte “A Song for You” em blocos curtos;
- animação de karaokê destacando a linha atual;
- botão play/pause;
- ritmo simples, sem excesso de sons.

### Critério de aceite
- a criança consegue acompanhar visualmente cada linha.

---

## 5.8. Final Quiz
### Objetivo
Consolidar o aprendizado.

### Requisitos
Misturar 3 tipos de desafio:
- vocabulário;
- yes/no;
- completar mini diálogo.

### Resultado final
- mostrar número de acertos;
- mostrar medalha visual ou estrelas;
- botão para refazer.

### Critério de aceite
- exibir feedback final amigável.

---

## 6. Dados do sistema
Sugere-se centralizar o conteúdo em um arquivo `data.js`.

## Estrutura sugerida
```javascript
export const vocabulary = [
  { id: 'book', label: 'book', image: 'assets/images/book.png', audio: 'assets/audio/book.mp3' },
  { id: 'notepad', label: 'notepad', image: 'assets/images/notepad.png', audio: 'assets/audio/notepad.mp3' },
  { id: 'boy', label: 'boy', image: 'assets/images/boy.png', audio: 'assets/audio/boy.mp3' },
  { id: 'girl', label: 'girl', image: 'assets/images/girl.png', audio: 'assets/audio/girl.mp3' },
  { id: 'car', label: 'car', image: 'assets/images/car.png', audio: 'assets/audio/car.mp3' },
  { id: 'dinosaur', label: 'dinosaur', image: 'assets/images/dinosaur.png', audio: 'assets/audio/dinosaur.mp3' },
  { id: 'binder', label: 'binder', image: 'assets/images/binder.png', audio: 'assets/audio/binder.mp3' },
  { id: 'folder', label: 'folder', image: 'assets/images/folder.png', audio: 'assets/audio/folder.mp3' },
  { id: 'highlighter', label: 'highlighter', image: 'assets/images/highlighter.png', audio: 'assets/audio/highlighter.mp3' }
];
```

Também criar coleções para:
- perguntas do quiz;
- falas do diálogo;
- linhas do chant.

---

## 7. Estratégia de UX infantil

## Princípios
- poucos elementos por tela;
- botões grandes;
- tipografia legível;
- contraste forte;
- feedback instantâneo;
- navegação previsível;
- progresso visual.

## Diretrizes
- cada tela deve ter apenas 1 objetivo principal;
- usar ícones consistentes;
- evitar rolagem longa;
- manter textos em inglês curtos;
- instruções do adulto podem ficar discretamente em português.

---

## 8. Animações

## Regras
- usar apenas animações leves com CSS;
- priorizar performance mobile;
- evitar bibliotecas pesadas.

## Exemplos
- `fade-in` para entrada de tela;
- `bounce` suave para acerto;
- `shake` suave para tentativa incorreta;
- `flip-card` para jogo da memória futuro;
- `progress-bar` animada.

---

## 9. Acessibilidade

## Requisitos mínimos
- botões com `aria-label`;
- imagens com `alt`;
- navegação por teclado básica;
- contraste mínimo adequado;
- áudio sempre opcional.

---

## 10. Responsividade

## Breakpoints sugeridos
- mobile: até 767px
- tablet: 768px a 1023px
- desktop: 1024px+

## Comportamento esperado
- cards empilhados no mobile;
- grid 2x no tablet;
- grid 3x no desktop.

---

## 11. Persistência local
Opcionalmente usar `localStorage` para salvar:
- último módulo acessado;
- pontuação do quiz;
- status de conclusão.

Isso não exige backend e funciona bem em S3.

---

## 12. Estratégia de áudio

## Opções
### Opção A – Arquivos gravados
Melhor para qualidade e consistência.

### Opção B – Speech Synthesis API
Mais simples para MVP, sem gravar arquivos.

## Recomendação
Começar com **Speech Synthesis API** para o protótipo e deixar suporte a áudios gravados para versão posterior.

---

## 13. Etapas de implementação

## Fase 1 – Fundação
- criar estrutura de pastas;
- definir tokens visuais;
- criar layout base;
- criar sistema simples de rotas por hash.

## Fase 2 – Conteúdo fixo
- cadastrar vocabulário;
- cadastrar diálogo;
- cadastrar quiz;
- cadastrar chant.

## Fase 3 – Interações
- implementar player de áudio;
- implementar quiz de vocabulário;
- implementar quiz yes/no;
- implementar tela do diálogo.

## Fase 4 – Polimento
- animações leves;
- feedback visual;
- responsividade;
- acessibilidade.

## Fase 5 – Deploy
- build estático;
- upload para bucket S3;
- ativar static website hosting;
- configurar política pública ou distribuição via CloudFront.

---

## 14. Deploy em AWS S3

## Passos
1. Criar bucket S3.
2. Habilitar **Static website hosting**.
3. Definir `index.html` como documento principal.
4. Definir `404.html` para erros.
5. Fazer upload dos arquivos.
6. Ajustar permissões conforme estratégia de publicação.
7. Opcionalmente colocar CloudFront na frente.

## Observação
Se o projeto usar rotas SPA, preferir fallback simples com hash routing para evitar problemas no S3.

---

## 15. Critérios gerais de aceite
O projeto estará pronto quando:
- funcionar em celular;
- apresentar apenas o conteúdo da Lesson 1;
- permitir estudo autônomo guiado;
- possuir pelo menos 4 experiências interativas;
- puder ser publicado como site estático em S3;
- tiver boa legibilidade para uma criança de 9 anos.

---

## 16. Próxima evolução possível
Sem sair da lição, futuras melhorias podem incluir:
- gravação de voz da criança para comparação;
- modo professor/responsável;
- relatório simples de desempenho local;
- PWA para uso semelhante a app.
