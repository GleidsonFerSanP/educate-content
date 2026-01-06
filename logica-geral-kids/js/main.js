// Funções utilitárias compartilhadas

// Sistema de Feedback Visual
function mostrarFeedback(mensagem, tipo = "sucesso") {
  const feedback = document.getElementById("feedback");
  const overlay = document.getElementById("overlay");

  if (!feedback || !overlay) return;

  feedback.textContent = mensagem;
  feedback.className = `feedback ${tipo}`;
  feedback.style.display = "block";
  overlay.style.display = "block";

  setTimeout(() => {
    feedback.style.display = "none";
    overlay.style.display = "none";
  }, 2000);
}

// Web Audio API - Sons de feedback
function tocarSom(frequencia, duracao = 0.1, tipo = "sine") {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = tipo;
    oscillator.frequency.value = frequencia;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duracao
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duracao);
  } catch (e) {
    console.log("Audio não suportado:", e);
  }
}

// Sons específicos
const Sons = {
  acerto: () => tocarSom(800, 0.1),
  erro: () => tocarSom(200, 0.2),
  clique: () => tocarSom(400, 0.05),
  vitoria: () => {
    tocarSom(523, 0.1);
    setTimeout(() => tocarSom(659, 0.1), 100);
    setTimeout(() => tocarSom(784, 0.2), 200);
  },
};

// Animação de confetes
function criarConfetes() {
  const cores = ["#10B981", "#F59E0B", "#06B6D4", "#8B5CF6", "#EC4899"];
  const container = document.body;

  for (let i = 0; i < 50; i++) {
    const confete = document.createElement("div");
    confete.style.position = "fixed";
    confete.style.width = "10px";
    confete.style.height = "10px";
    confete.style.backgroundColor =
      cores[Math.floor(Math.random() * cores.length)];
    confete.style.left = Math.random() * 100 + "%";
    confete.style.top = "-10px";
    confete.style.opacity = "1";
    confete.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confete.style.transform = `rotate(${Math.random() * 360}deg)`;
    confete.style.zIndex = "9999";
    confete.style.pointerEvents = "none";

    container.appendChild(confete);

    const animacao = confete.animate(
      [
        {
          transform: `translate(0, 0) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translate(${Math.random() * 200 - 100}px, ${
            window.innerHeight + 20
          }px) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 2000 + Math.random() * 1000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    );

    animacao.onfinish = () => confete.remove();
  }
}

// LocalStorage - Salvar progresso
const Progresso = {
  salvar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
      console.log("LocalStorage não disponível:", e);
    }
  },

  carregar(chave, padrao = null) {
    try {
      const item = localStorage.getItem(chave);
      return item ? JSON.parse(item) : padrao;
    } catch (e) {
      console.log("Erro ao carregar:", e);
      return padrao;
    }
  },

  limpar(chave) {
    try {
      localStorage.removeItem(chave);
    } catch (e) {
      console.log("Erro ao limpar:", e);
    }
  },
};

// Embaralhar array (Fisher-Yates)
function embaralhar(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Aguardar tempo (Promise)
function aguardar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Criar elemento com classes e atributos
function criarElemento(tag, classes = [], atributos = {}) {
  const elemento = document.createElement(tag);
  if (classes.length) elemento.className = classes.join(" ");
  Object.entries(atributos).forEach(([chave, valor]) => {
    elemento.setAttribute(chave, valor);
  });
  return elemento;
}

// Animação de pulso
function pulsar(elemento) {
  elemento.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.1)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 300,
      easing: "ease-in-out",
    }
  );
}

// Timer formatado (mm:ss)
function formatarTempo(segundos) {
  const mins = Math.floor(segundos / 60);
  const secs = segundos % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Detectar dispositivo móvel
function ehMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Log de debug colorido
const Debug = {
  log: (msg, cor = "#10B981") => {
    console.log(`%c[Lógica Kids] ${msg}`, `color: ${cor}; font-weight: bold;`);
  },
  erro: (msg) => {
    console.error(`%c[ERRO] ${msg}`, "color: #EF4444; font-weight: bold;");
  },
  sucesso: (msg) => {
    console.log(`%c[✓] ${msg}`, "color: #10B981; font-weight: bold;");
  },
};
