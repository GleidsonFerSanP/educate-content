// ===== EDUCATE - JavaScript Principal =====

// Animação de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animação de entrada dos cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(20px)";

      setTimeout(() => {
        entry.target.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, 100);

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos os cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".module-card, .feature-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    setTimeout(() => {
      observer.observe(card);
    }, index * 100);
  });
});

// Som de clique nos botões (opcional)
document.querySelectorAll(".module-button").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    tocarSom(400, 50, "sine");
  });

  button.addEventListener("click", () => {
    tocarSom(600, 100, "sine");
  });
});

// Função para tocar sons (Web Audio API)
function tocarSom(frequencia, duracao, tipo = "sine") {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = tipo;
    oscillator.frequency.value = frequencia;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duracao / 1000
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duracao / 1000);
  } catch (e) {
    // Silenciosamente falha se Web Audio API não estiver disponível
    console.log("Web Audio API não disponível");
  }
}

// Efeito parallax nas estrelas
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const estrelas = document.querySelector(".estrelas");
      if (estrelas) {
        estrelas.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

// Adicionar efeito de hover nos cards com cursor
document.querySelectorAll(".module-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Debug info (apenas em desenvolvimento)
const Debug = {
  log: (...args) => {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.log("%c[Educate]", "color: #6366F1; font-weight: bold;", ...args);
    }
  },
  error: (...args) => {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.error(
        "%c[Educate Error]",
        "color: #EF4444; font-weight: bold;",
        ...args
      );
    }
  },
};

Debug.log("Website inicializado!");
Debug.log("Módulos disponíveis:", 4);
