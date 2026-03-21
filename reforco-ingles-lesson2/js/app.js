import { parseRouteFromHash, goTo } from "./router.js";
import {
  appState,
  setRoute,
  getNextRoute,
  getPrevRoute,
  loadProgress,
  saveProgress,
  completeScreen,
  resetAll,
} from "./state.js";
import {
  setProgressBar,
  showToast,
  animateCorrect,
  animateWrong,
} from "./components.js";
import { speak, speakAsync, stopSpeak } from "./audio.js";

import { renderHome } from "./screens/home.js";
import { renderWordsFirst } from "./screens/words-first.js";
import { renderInstructors } from "./screens/instructors.js";
import { renderSwimmingClass } from "./screens/swimming-class.js";
import { renderPetShop } from "./screens/pet-shop.js";
import { renderCounting } from "./screens/counting.js";
import { renderWhatsThis } from "./screens/whats-this.js";
import { renderFinalQuiz } from "./screens/final-quiz.js";
import { renderExam } from "./screens/exam.js";

const screen = document.getElementById("screen");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const renderers = {
  home: renderHome,
  "words-first": renderWordsFirst,
  instructors: renderInstructors,
  "swimming-class": renderSwimmingClass,
  "pet-shop": renderPetShop,
  counting: renderCounting,
  "whats-this": renderWhatsThis,
  "final-quiz": renderFinalQuiz,
  exam: renderExam,
};

function renderCurrentRoute() {
  const route = parseRouteFromHash();
  setRoute(route);

  const renderer = renderers[route] || renderHome;
  try {
    renderer(screen, {
      appState,
      goTo,
      speak,
      speakAsync,
      stopSpeak,
      showToast,
      animateCorrect,
      animateWrong,
      completeScreen,
      saveProgress,
      resetAll,
    });
  } catch (error) {
    console.error("Render error:", error);
    if (screen) {
      screen.innerHTML = `
        <section class="card center screen-enter">
          <h2>⚠️ O conteudo nao carregou</h2>
          <p class="hint">Vamos tentar novamente.</p>
          <button id="retryBtn" class="btn btn-primary btn-block">Recarregar tela</button>
          <button id="homeBtn" class="btn btn-secondary btn-block" style="margin-top:8px;">Ir para Home</button>
        </section>
      `;
      screen.querySelector("#retryBtn")?.addEventListener("click", () => {
        renderCurrentRoute();
      });
      screen.querySelector("#homeBtn")?.addEventListener("click", () => {
        goTo("home");
      });
    }
  }

  setProgressBar();
  saveProgress();
}

prevBtn?.addEventListener("click", () => {
  goTo(getPrevRoute());
});

nextBtn?.addEventListener("click", () => {
  goTo(getNextRoute());
});

window.addEventListener("hashchange", renderCurrentRoute);

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  showToast("Erro inesperado. Recarregue.");
});

loadProgress();
if (!window.location.hash) {
  goTo("home");
} else {
  renderCurrentRoute();
}
