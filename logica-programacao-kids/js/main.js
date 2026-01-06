// ============================================
// LÓGICA DE PROGRAMAÇÃO PARA CRIANÇAS
// JavaScript principal com funções utilitárias
// ============================================

// Função para criar confetes quando acertar
function criarConfetes() {
  const cores = [
    "#FF6B9D",
    "#4ECDC4",
    "#FFD93D",
    "#A960EE",
    "#FF8C42",
    "#6BCF7F",
  ];
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  for (let i = 0; i < 50; i++) {
    const confete = document.createElement("div");
    confete.style.position = "absolute";
    confete.style.width = "10px";
    confete.style.height = "10px";
    confete.style.backgroundColor =
      cores[Math.floor(Math.random() * cores.length)];
    confete.style.left = Math.random() * 100 + "%";
    confete.style.top = "-10px";
    confete.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confete.style.animation = `cair ${Math.random() * 2 + 2}s linear forwards`;
    container.appendChild(confete);
  }

  // Adiciona animação CSS dinamicamente
  if (!document.getElementById("confete-style")) {
    const style = document.createElement("style");
    style.id = "confete-style";
    style.textContent = `
            @keyframes cair {
                to {
                    transform: translateY(100vh) rotate(${
                      Math.random() * 360
                    }deg);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    container.remove();
  }, 4000);
}

// Função para reproduzir som de acerto (usando Web Audio API)
function tocarSomAcerto() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 523.25; // C5
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

// Função para tocar som de erro
function tocarSomErro() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 200; // G3
  oscillator.type = "sawtooth";

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.3
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

// Função para embaralhar arrays
function embaralhar(array) {
  const novoArray = [...array];
  for (let i = novoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
  }
  return novoArray;
}

// Função para mostrar feedback
function mostrarFeedback(elemento, mensagem, tipo) {
  elemento.textContent = mensagem;
  elemento.className = "feedback " + tipo;
  elemento.style.display = "block";

  if (tipo === "correto") {
    tocarSomAcerto();
    criarConfetes();
  } else {
    tocarSomErro();
  }

  setTimeout(() => {
    elemento.style.display = "none";
  }, 3000);
}

// Função para salvar progresso no localStorage
function salvarProgresso(topico, completado) {
  const progresso = JSON.parse(
    localStorage.getItem("progressoProgramacao") || "{}"
  );
  progresso[topico] = completado;
  localStorage.setItem("progressoProgramacao", JSON.stringify(progresso));
}

// Função para carregar progresso
function carregarProgresso(topico) {
  const progresso = JSON.parse(
    localStorage.getItem("progressoProgramacao") || "{}"
  );
  return progresso[topico] || false;
}

// Função para animação de entrada dos elementos
function animarEntrada(elementos, delay = 100) {
  elementos.forEach((elemento, index) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(20px)";
    setTimeout(() => {
      elemento.style.transition = "all 0.5s ease";
      elemento.style.opacity = "1";
      elemento.style.transform = "translateY(0)";
    }, index * delay);
  });
}

// Função para criar botão de voltar
function criarBotaoVoltar() {
  const btn = document.createElement("a");
  btn.href = "../index.html";
  btn.className = "btn-voltar";
  btn.innerHTML = "← Voltar ao Menu";
  document.body.appendChild(btn);
}

// Implementação de Drag and Drop
class DragDropManager {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.items = [];
    this.dropZones = [];
    this.init();
  }

  init() {
    this.setupDraggables();
    this.setupDropZones();
  }

  setupDraggables() {
    const draggables = this.container.querySelectorAll(".drag-item");
    draggables.forEach((item) => {
      item.draggable = true;

      item.addEventListener("dragstart", (e) => {
        item.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", item.innerHTML);
        e.dataTransfer.setData("text/plain", item.dataset.id);
      });

      item.addEventListener("dragend", (e) => {
        item.classList.remove("dragging");
      });
    });
  }

  setupDropZones() {
    const zones = this.container.querySelectorAll(".drop-zone");
    zones.forEach((zone) => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("over");
      });

      zone.addEventListener("dragleave", (e) => {
        zone.classList.remove("over");
      });

      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("over");

        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedElement = document.querySelector(
          `[data-id="${draggedId}"]`
        );

        if (draggedElement) {
          zone.appendChild(draggedElement);
          this.onDrop(draggedElement, zone);
        }
      });
    });
  }

  onDrop(item, zone) {
    // Override em implementações específicas
    console.log("Item dropped:", item, "in zone:", zone);
  }
}

// Sistema de pontuação
class SistemaPontuacao {
  constructor() {
    this.pontos = 0;
    this.acertos = 0;
    this.erros = 0;
  }

  adicionar(pontos) {
    this.pontos += pontos;
    this.acertos++;
    this.atualizar();
  }

  remover(pontos) {
    this.pontos = Math.max(0, this.pontos - pontos);
    this.erros++;
    this.atualizar();
  }

  atualizar() {
    const elemento = document.querySelector(".pontuacao");
    if (elemento) {
      elemento.textContent = `⭐ Pontos: ${this.pontos} | ✅ Acertos: ${this.acertos} | ❌ Erros: ${this.erros}`;
    }
  }

  reset() {
    this.pontos = 0;
    this.acertos = 0;
    this.erros = 0;
    this.atualizar();
  }
}

// Inicialização global
document.addEventListener("DOMContentLoaded", () => {
  // Animação de entrada suave
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  // Animar elementos com classe especial
  const elementosAnimados = document.querySelectorAll(".animar-entrada");
  if (elementosAnimados.length > 0) {
    animarEntrada(Array.from(elementosAnimados));
  }
});

// Exportar funções globalmente
window.criarConfetes = criarConfetes;
window.tocarSomAcerto = tocarSomAcerto;
window.tocarSomErro = tocarSomErro;
window.embaralhar = embaralhar;
window.mostrarFeedback = mostrarFeedback;
window.salvarProgresso = salvarProgresso;
window.carregarProgresso = carregarProgresso;
window.animarEntrada = animarEntrada;
window.criarBotaoVoltar = criarBotaoVoltar;
window.DragDropManager = DragDropManager;
window.SistemaPontuacao = SistemaPontuacao;
