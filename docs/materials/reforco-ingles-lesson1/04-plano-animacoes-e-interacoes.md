# Plano de Animações e Interações

## 1. Objetivo
Adicionar movimento suficiente para manter o interesse da criança, sem poluir a tela nem distrair do aprendizado.

---

## 2. Princípios
- animações curtas;
- feedback imediato;
- movimento com propósito pedagógico;
- performance boa em celular.

---

## 3. Lista de animações

## 3.1. Entrada de tela
### Tipo
`fade + slide-up`

### Uso
Toda vez que mudar de tela.

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
- palavra aumenta levemente;
- estrelas aparecem e somem.

---

## 3.3. Erro leve
### Tipo
`soft shake`

### Uso
Resposta incorreta.

### Duração
200ms.

### Observação
Sem efeito negativo forte.

---

## 3.4. Card de vocabulário
### Tipo
`hover/tap bounce`

### Uso
Ao clicar no card.

### Função pedagógica
Reforçar associação entre clique, som e palavra.

---

## 3.5. Livro abrindo
### Tipo
`open-book illusion`

### Uso
Na tela que trabalha “A Book” ou “about cars / dinosaurs”.

### Função pedagógica
Criar conexão visual com o tema central da lição.

---

## 3.6. Balão de fala
### Tipo
`pop-in`

### Uso
No diálogo.

### Função
Dar ritmo de conversa.

---

## 3.7. Barra de progresso
### Tipo
`width transition`

### Uso
Ao concluir atividades.

### Função
Mostrar avanço e incentivar continuação.

---

## 4. Interações essenciais

## 4.1. Clique com áudio
Ao clicar em:
- palavra
- frase
- botão de escuta

Executar áudio ou síntese de voz.

---

## 4.2. Repetir atividade
Cada tela de jogo deve ter:
- botão **Try again**
- botão **Next**

---

## 4.3. Feedback textual curto
### Correto
- Great!
- Nice!
- Good job!

### Incorreto
- Try again!
- Almost!

---

## 5. Implementação técnica sugerida

## CSS
Usar `@keyframes` para:
- fadeIn
- bounceSoft
- shakeSoft
- popIn

## JavaScript
Adicionar/remover classes CSS dinamicamente.

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
- clique leve.

Evitar trilha contínua longa.
