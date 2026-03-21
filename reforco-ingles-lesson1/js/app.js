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
import { renderVocabulary } from "./screens/vocabulary.js";
import { renderWhatsThis } from "./screens/whats-this.js";
import { renderYesNo } from "./screens/yes-no.js";
import { renderAbout } from "./screens/about.js";
import { renderDialogue } from "./screens/dialogue.js";
import { renderChant } from "./screens/chant.js";
import { renderFinalQuiz } from "./screens/final-quiz.js";

const screen = document.getElementById("screen");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const renderers = {
  home: renderHome,
  vocabulary: renderVocabulary,
  "whats-this": renderWhatsThis,
  "yes-no": renderYesNo,
  about: renderAbout,
  dialogue: renderDialogue,
  chant: renderChant,
  "final-quiz": renderFinalQuiz,
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
          <h2>⚠️ O conteúdo não carregou</h2>
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
