// Utilitários para o site Portugol Kids
// Funções reutilizáveis para jogos e interatividade

// ==================== EFEITOS VISUAIS ====================

/**
 * Cria confetes para celebração
 */
function criarConfetes() {
  const cores = [
    "#6B46C1",
    "#9333EA",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EC4899",
  ];
  const quantidade = 50;

  for (let i = 0; i < quantidade; i++) {
    setTimeout(() => {
      const confete = document.createElement("div");
      confete.className = "confete";
      confete.style.left = Math.random() * 100 + "%";
      confete.style.background =
        cores[Math.floor(Math.random() * cores.length)];
      confete.style.animationDelay = Math.random() * 0.5 + "s";
      confete.style.animationDuration = Math.random() * 2 + 2 + "s";
      document.body.appendChild(confete);

      setTimeout(() => confete.remove(), 3000);
    }, i * 20);
  }
}

/**
 * Cria estrelas no fundo
 */
function criarEstrelas() {
  const container = document.querySelector(".estrelas");
  if (!container) return;

  const quantidade = 100;

  for (let i = 0; i < quantidade; i++) {
    const estrela = document.createElement("div");
    estrela.className = "estrela";
    estrela.style.left = Math.random() * 100 + "%";
    estrela.style.top = Math.random() * 100 + "%";
    estrela.style.animationDelay = Math.random() * 3 + "s";
    estrela.style.animationDuration = Math.random() * 2 + 2 + "s";
    container.appendChild(estrela);
  }
}

// ==================== SONS ====================

/**
 * Toca som de acerto usando Web Audio API
 */
function tocarSomAcerto() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

/**
 * Toca som de erro
 */
function tocarSomErro() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 200;
  oscillator.type = "sawtooth";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.3
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

// ==================== UTILITÁRIOS ====================

/**
 * Embaralha um array (Fisher-Yates)
 */
function embaralhar(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Mostra feedback visual
 */
function mostrarFeedback(mensagem, tipo = "sucesso") {
  const feedback = document.getElementById("feedback");
  if (!feedback) return;

  feedback.textContent = mensagem;
  feedback.className = `feedback ${tipo}`;
  feedback.style.display = "block";

  if (tipo === "sucesso") {
    tocarSomAcerto();
    criarConfetes();
  } else {
    tocarSomErro();
  }

  setTimeout(() => {
    feedback.style.display = "none";
  }, 3000);
}

/**
 * Salva progresso no localStorage
 */
function salvarProgresso(chave, dados) {
  try {
    localStorage.setItem(`portugol_kids_${chave}`, JSON.stringify(dados));
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
  }
}

/**
 * Carrega progresso do localStorage
 */
function carregarProgresso(chave) {
  try {
    const dados = localStorage.getItem(`portugol_kids_${chave}`);
    return dados ? JSON.parse(dados) : null;
  } catch (error) {
    console.error("Erro ao carregar progresso:", error);
    return null;
  }
}

// ==================== DRAG AND DROP ====================

class DragDropManager {
  constructor(opcoesSelector, dropZonesSelector) {
    this.opcoes = document.querySelectorAll(opcoesSelector);
    this.dropZones = document.querySelectorAll(dropZonesSelector);
    this.inicializar();
  }

  inicializar() {
    // Configura itens arrastáveis
    this.opcoes.forEach((opcao) => {
      opcao.draggable = true;

      opcao.addEventListener("dragstart", (e) => {
        opcao.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", opcao.innerHTML);
        e.dataTransfer.setData(
          "text/plain",
          opcao.dataset.id || opcao.textContent
        );
      });

      opcao.addEventListener("dragend", () => {
        opcao.classList.remove("dragging");
      });
    });

    // Configura zonas de drop
    this.dropZones.forEach((zone) => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("drag-over");
      });

      zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
      });

      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");

        const data = e.dataTransfer.getData("text/plain");
        const draggedElement = document.querySelector(".dragging");

        if (draggedElement) {
          // Remove item anterior da zona se existir
          const itemExistente = zone.querySelector(".drag-item");
          if (itemExistente) {
            itemExistente.remove();
          }

          // Clona e adiciona o elemento
          const clone = draggedElement.cloneNode(true);
          clone.draggable = false;
          zone.appendChild(clone);
        }
      });
    });
  }

  verificarRespostas(gabarito) {
    let acertos = 0;

    this.dropZones.forEach((zone, index) => {
      const item = zone.querySelector(".drag-item");

      if (item) {
        const resposta = item.dataset.id || item.textContent.trim();
        const correto = resposta === gabarito[index];

        zone.classList.remove("correto", "incorreto");
        zone.classList.add(correto ? "correto" : "incorreto");

        if (correto) acertos++;
      }
    });

    return {
      acertos,
      total: this.dropZones.length,
      percentual: Math.round((acertos / this.dropZones.length) * 100),
    };
  }

  limpar() {
    this.dropZones.forEach((zone) => {
      zone.innerHTML = "";
      zone.classList.remove("correto", "incorreto", "drag-over");
    });
  }
}

// ==================== SISTEMA DE PONTUAÇÃO ====================

class SistemaPontuacao {
  constructor(pontuacaoElementId = "pontuacao", nivelElementId = "nivel") {
    this.pontuacao = 0;
    this.nivel = 1;
    this.elementoPontuacao = document.getElementById(pontuacaoElementId);
    this.elementoNivel = document.getElementById(nivelElementId);
    this.carregarProgresso();
  }

  adicionarPontos(pontos) {
    this.pontuacao += pontos;
    this.atualizar();
    this.verificarNivel();
  }

  removerPontos(pontos) {
    this.pontuacao = Math.max(0, this.pontuacao - pontos);
    this.atualizar();
  }

  verificarNivel() {
    const novoNivel = Math.floor(this.pontuacao / 100) + 1;
    if (novoNivel > this.nivel) {
      this.nivel = novoNivel;
      mostrarFeedback(
        `🎉 Parabéns! Você subiu para o nível ${this.nivel}!`,
        "sucesso"
      );
      criarConfetes();
    }
  }

  atualizar() {
    if (this.elementoPontuacao) {
      this.elementoPontuacao.textContent = this.pontuacao;
    }
    if (this.elementoNivel) {
      this.elementoNivel.textContent = this.nivel;
    }
    this.salvarProgresso();
  }

  salvarProgresso() {
    salvarProgresso("pontuacao", {
      pontuacao: this.pontuacao,
      nivel: this.nivel,
    });
  }

  carregarProgresso() {
    const dados = carregarProgresso("pontuacao");
    if (dados) {
      this.pontuacao = dados.pontuacao || 0;
      this.nivel = dados.nivel || 1;
      this.atualizar();
    }
  }

  resetar() {
    this.pontuacao = 0;
    this.nivel = 1;
    this.atualizar();
  }
}

// ==================== VALIDADOR DE CÓDIGO PORTUGOL ====================

class ValidadorPortugol {
  static validarSintaxe(codigo) {
    const erros = [];

    // Verifica estrutura básica
    if (!codigo.includes("programa")) {
      erros.push('Falta a palavra-chave "programa"');
    }

    if (!codigo.includes("funcao inicio()")) {
      erros.push("Falta a função inicio()");
    }

    // Verifica chaves balanceadas
    const abreChaves = (codigo.match(/{/g) || []).length;
    const fechaChaves = (codigo.match(/}/g) || []).length;

    if (abreChaves !== fechaChaves) {
      erros.push("Chaves não balanceadas");
    }

    // Verifica ponto e vírgula
    const linhas = codigo.split("\n");
    linhas.forEach((linha, i) => {
      const linhaTrim = linha.trim();
      if (
        linhaTrim &&
        !linhaTrim.endsWith("{") &&
        !linhaTrim.endsWith("}") &&
        !linhaTrim.startsWith("//") &&
        !linhaTrim.startsWith("programa") &&
        !linhaTrim.includes("funcao") &&
        !linhaTrim.endsWith(";")
      ) {
        // Ignora linhas vazias e estruturas de controle sem corpo
        if (!linhaTrim.match(/^(se|senao|para|enquanto|faca|escolha|caso)/)) {
          erros.push(`Linha ${i + 1}: Falta ponto e vírgula`);
        }
      }
    });

    return {
      valido: erros.length === 0,
      erros,
    };
  }
}

// ==================== INICIALIZAÇÃO ====================

// Criar estrelas quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  const containerEstrelas = document.querySelector(".estrelas");
  if (containerEstrelas) {
    criarEstrelas();
  }
});

// Exporta funções globalmente
window.criarConfetes = criarConfetes;
window.criarEstrelas = criarEstrelas;
window.tocarSomAcerto = tocarSomAcerto;
window.tocarSomErro = tocarSomErro;
window.embaralhar = embaralhar;
window.mostrarFeedback = mostrarFeedback;
window.salvarProgresso = salvarProgresso;
window.carregarProgresso = carregarProgresso;
window.DragDropManager = DragDropManager;
window.SistemaPontuacao = SistemaPontuacao;
window.ValidadorPortugol = ValidadorPortugol;
