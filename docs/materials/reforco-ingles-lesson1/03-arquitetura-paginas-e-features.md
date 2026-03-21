# Arquitetura de Páginas e Features

## 1. Visão geral
O site deve seguir uma estrutura de microsite educacional com fluxo linear e possibilidade de revisita.

```text
Home
  -> Vocabulary
  -> What's this?
  -> Is it a...?
  -> About cars / dinosaurs
  -> Dialogue
  -> Chant
  -> Final Quiz
  -> End / Replay
```

---

## 2. Mapa de telas

## 2.1. Home
### Componentes
- logo/título da lição
- botão Start
- personagem ou ilustração
- barra de progresso zerada

### Estado
- nenhuma dependência externa

---

## 2.2. Vocabulary
### Componentes
- card de vocabulário
- imagem
- palavra
- botão de som
- botões anterior/próximo
- indicador de progresso

### Estados
- índice atual
- áudio em reprodução

---

## 2.3. What’s this?
### Componentes
- imagem principal
- pergunta
- alternativas
- feedback visual
- botão próxima rodada

### Estados
- pergunta atual
- resposta escolhida
- acertos

---

## 2.4. Is it a...?
### Componentes
- imagem
- frase interrogativa
- botões de resposta
- feedback

### Estados
- rodada atual
- placar

---

## 2.5. About cars / dinosaurs
### Componentes
- livro fechado ou parcialmente oculto
- pergunta “Is it about cars?”
- botões de resposta
- card de revelação

### Estados
- antes da revelação
- depois da revelação

---

## 2.6. Dialogue
### Componentes
- cards ou balões de fala
- avatares Grandpa / Mike
- botão play line
- botão auto-play
- botão roleplay

### Estados
- linha ativa
- modo atual

---

## 2.7. Chant
### Componentes
- linhas do texto
- destaque sincronizado
- play/pause
- animação decorativa

### Estados
- linha atual
- reproduzindo ou pausado

---

## 2.8. Final Quiz
### Componentes
- perguntas mistas
- pontuação
- estrelas
- botão replay

### Estados
- índice da questão
- score final

---

## 3. Componentização sugerida

## Componentes globais
- `Header`
- `FooterNav`
- `ProgressBar`
- `AudioButton`
- `FeedbackToast`
- `PrimaryButton`
- `CharacterBubble`

## Componentes educacionais
- `VocabularyCard`
- `QuestionCard`
- `YesNoButtons`
- `DialogueBubble`
- `QuizResultCard`

---

## 4. Navegação
Usar `window.location.hash`.

### Exemplos de rotas
- `#/home`
- `#/vocabulary`
- `#/whats-this`
- `#/yes-no`
- `#/about`
- `#/dialogue`
- `#/chant`
- `#/final-quiz`

### Motivo
Hash routing funciona bem em site estático hospedado em S3 sem necessidade de reescrita de URL.

---

## 5. Gestão de estado
Criar um `state.js` simples.

## Estado global sugerido
```javascript
export const appState = {
  currentScreen: 'home',
  vocabularyIndex: 0,
  score: 0,
  completedScreens: [],
  audioEnabled: true
};
```

---

## 6. Estratégia de conteúdo
Todo o conteúdo textual deve vir de `data.js` para evitar texto hardcoded espalhado.

### Benefícios
- manutenção simples;
- fácil revisão pedagógica;
- mais seguro para manter escopo restrito à lição.

---

## 7. Ordem de desenvolvimento recomendada
1. shell base do app;
2. sistema de rotas;
3. tela vocabulary;
4. quiz what’s this;
5. quiz yes/no;
6. tela about;
7. dialogue;
8. chant;
9. final quiz;
10. refinamentos visuais.
