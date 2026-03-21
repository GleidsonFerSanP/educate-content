# Arquitetura de Páginas e Features – Lesson 2

## 1. Visão geral
O site deve seguir uma estrutura de microsite educacional com fluxo linear, curto e fácil de repetir.

```text
Home
  -> Words First
  -> Are you a...?
  -> Swimming Class
  -> Pet Shop Story
  -> Counting
  -> What is it?
  -> Final Quiz
  -> End / Replay
```

---

## 2. Mapa de telas

## 2.1. Home
### Componentes
- título da lição
- subtítulo com tema da aula
- botão Start
- ilustração amigável
- barra de progresso zerada

### Estado
- nenhuma dependência externa

---

## 2.2. Words First
### Componentes
- card de vocabulário
- imagem
- palavra
- botão de som
- botões anterior/próximo
- indicador de progresso

### Estados
- item atual
- categoria atual
- áudio em reprodução

---

## 2.3. Are you a...?
### Componentes
- imagem do personagem
- pergunta
- botões:
  - **Yes, I am.**
  - **No, I’m not.**
- feedback visual
- botão próxima rodada

### Estados
- rodada atual
- resposta escolhida
- acertos

---

## 2.4. Swimming Class
### Componentes
- cenário da piscina
- falas em sequência
- avatares dos personagens
- botão play line
- botão replay scene

### Estados
- linha ativa
- reprodução de áudio
- progresso do diálogo

---

## 2.5. Pet Shop Story
### Componentes
- cenário do pet shop
- balões de fala
- destaque no kitten escondido
- elemento clicável da cushion
- feedback de descoberta

### Estados
- início da história
- busca em andamento
- kitten encontrado

---

## 2.6. Counting
### Componentes
- grupo de animais ou objetos
- pergunta de quantidade
- opções numéricas ou campo de resposta
- feedback visual

### Estados
- rodada atual
- resposta selecionada
- score parcial

---

## 2.7. What is it?
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

## Componentes educacionais
- `VocabularyCard`
- `QuestionCard`
- `YesNoButtons`
- `DialogueBubble`
- `CounterCard`
- `QuizResultCard`

---

## 4. Navegação
Usar `window.location.hash`.

### Exemplos de rotas
- `#/home`
- `#/words-first`
- `#/instructors`
- `#/swimming-class`
- `#/pet-shop`
- `#/counting`
- `#/whats-this`
- `#/final-quiz`

### Motivo
Hash routing funciona bem em site estático e evita dependência de reescrita de URL.

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
  audioEnabled: true,
  foundKitten: false
};
```

---

## 6. Estratégia de conteúdo
Todo o conteúdo textual deve vir de `data.js`.

### Benefícios
- manutenção simples;
- revisão pedagógica mais fácil;
- garantia de escopo restrito à lição.

---

## 7. Ordem de desenvolvimento recomendada
1. shell base do app;
2. sistema de rotas;
3. tela de vocabulário;
4. quiz de instrutores;
5. cena da piscina;
6. história do pet shop;
7. tela de contagem;
8. quiz final;
9. refinamentos visuais.
