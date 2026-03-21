# Plano de Animações e Interações – Lesson 2

## 1. Objetivo
Adicionar movimento suficiente para manter o interesse da criança, sem distrair do aprendizado.

---

## 2. Princípios
- animações curtas;
- feedback imediato;
- movimento com função pedagógica;
- boa performance em celular;
- sensação leve e brincalhona.

---

## 3. Lista de animações

## 3.1. Entrada de tela
### Tipo
`fade + slide-up`

### Uso
Sempre que uma nova tela for exibida.

### Duração
300ms a 450ms.

---

## 3.2. Acerto
### Tipo
`scale-up + sparkle`

### Uso
Quando a criança responder corretamente.

### Duração
300ms.

### Efeito visual
- card cresce levemente;
- estrelas ou bolhas aparecem e somem.

---

## 3.3. Erro leve
### Tipo
`soft shake`

### Uso
Resposta incorreta.

### Duração
200ms.

### Observação
Sem punição visual forte.

---

## 3.4. Card de vocabulário
### Tipo
`tap bounce`

### Uso
Ao tocar em palavras como `kitten`, `puppy` ou `pet shop`.

### Função pedagógica
Reforçar a ligação entre imagem, palavra e som.

---

## 3.5. Água da piscina
### Tipo
`gentle wave`

### Uso
Na tela de natação.

### Função pedagógica
Dar contexto visual para o diálogo da swimming class.

---

## 3.6. Busca do kitten
### Tipo
`peek + reveal`

### Uso
Quando a criança toca na cushion correta.

### Função pedagógica
Transformar a frase **Look! It’s here, under this cushion** em ação.

---

## 3.7. Contagem
### Tipo
`number pop`

### Uso
Ao confirmar respostas de quantidade.

### Função pedagógica
Destacar o número correto sem poluir a tela.

---

## 3.8. Balões de fala
### Tipo
`pop-in`

### Uso
No diálogo da piscina e na história do pet shop.

### Função
Dar ritmo à conversa.

---

## 4. Interações essenciais

## 4.1. Clique com áudio
Ao clicar em:
- palavra;
- frase;
- botão de escuta;
- número;

executar áudio ou síntese de voz.

---

## 4.2. Repetir atividade
Cada tela de prática deve ter:
- botão **Try again**
- botão **Next**

---

## 4.3. Feedback textual curto
### Correto
- Great!
- Nice!
- Good job!
- You found it!

### Incorreto
- Try again!
- Almost!
- Look again!

---

## 5. Implementação técnica sugerida

## CSS
Usar `@keyframes` para:
- fadeIn
- bounceSoft
- shakeSoft
- popIn
- waveFloat
- revealUnder

## JavaScript
Adicionar e remover classes dinamicamente.

### Exemplo
```javascript
function animateCorrect(element) {
  element.classList.add('correct-pop');
  setTimeout(() => element.classList.remove('correct-pop'), 400);
}
```

---

## 6. Sons
Se houver sons adicionais, manter no mínimo:
- acerto curto;
- erro curto;
- clique leve;
- efeito de água suave;
- efeito de descoberta do kitten.

Evitar trilha contínua longa.
