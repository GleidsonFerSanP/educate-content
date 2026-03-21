# PATTERNS REFERENCE — educate-content

## Padrões recorrentes do código

### 1) Utilitários por módulo (duplicação intencional)

Cada módulo mantém seu próprio `js/main.js` com funções como:
* `mostrarFeedback(...)`
* `tocarSom(...)` / `tocarSomAcerto()` / `tocarSomErro()`
* `criarConfetes()`
* helpers de `localStorage`

**Motivo:** autonomia de deploy e manutenção por módulo.

### 2) Estrutura de conteúdo educacional

* `index.html` (entrada do módulo)
* `topicos/` (conteúdo teórico)
* `jogos/` (prática interativa)
* `css/styles.css` e `js/main.js` locais

### 3) Feedback imediato ao aluno

* Acerto: som + mensagem + animação/celebração
* Erro: mensagem clara + nova tentativa

### 4) Estado local simples

* Persistência via `localStorage`
* Chaves com prefixo de módulo (evitar colisão)

## Snippets de referência

### Safe audio

```javascript
function tocarSomSeguro(freq, duracao) {
    try {
        const ctx = new(window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duracao);
        osc.start();
        osc.stop(ctx.currentTime + duracao);
    } catch (_) {}
}
```

### Save/load progress

```javascript
function salvar(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function carregar(chave, fallback = null) {
    const dado = localStorage.getItem(chave);
    return dado ? JSON.parse(dado) : fallback;
}
```

## Checagem antes de merge

* Links relativos funcionando
* Mobile sem quebra visual
* Som e feedback não bloqueiam interação
* Sem dependência externa nova
