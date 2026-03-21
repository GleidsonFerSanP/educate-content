import { vocabulary } from "../data.js";

export function renderVocabulary(
  container,
  {
    appState,
    speak,
    showToast,
    animateCorrect,
    completeScreen,
    saveProgress,
    goTo,
  },
) {
  completeScreen("vocabulary");
  const item = vocabulary[appState.vocabularyIndex];

  container.innerHTML = `
    <section class="grid grid-2 screen-enter">
      <article class="card word-card" id="wordCard" tabindex="0" aria-label="Vocabulary card">
        <div class="word-emoji" aria-hidden="true">${item.emoji}</div>
        <div class="word-label">${item.label}</div>
        <p class="hint">What’s this?</p>
      </article>
      <article class="card">
        <h3>Vocabulary ${appState.vocabularyIndex + 1} / ${vocabulary.length}</h3>
        <button id="speakWordBtn" class="btn btn-secondary btn-block" aria-label="Play word audio">Listen</button>
        <button id="prevWordBtn" class="btn btn-secondary btn-block" style="margin-top:8px;" aria-label="Previous word">Previous word</button>
        <button id="nextWordBtn" class="btn btn-primary btn-block" style="margin-top:8px;" aria-label="Next word">Next word</button>
        <button id="startQuizBtn" class="btn btn-success btn-block" style="margin-top:8px;" aria-label="Start What is this activity">Go to What’s this?</button>
      </article>
    </section>
  `;

  const play = () => {
    speak(item.label);
    animateCorrect(container.querySelector("#wordCard"));
  };

  container.querySelector("#wordCard")?.addEventListener("click", play);
  container.querySelector("#wordCard")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      play();
    }
  });

  container.querySelector("#speakWordBtn")?.addEventListener("click", play);

  container.querySelector("#prevWordBtn")?.addEventListener("click", () => {
    appState.vocabularyIndex = Math.max(0, appState.vocabularyIndex - 1);
    saveProgress();
    renderVocabulary(container, {
      appState,
      speak,
      showToast,
      animateCorrect,
      completeScreen,
      saveProgress,
      goTo,
    });
  });

  container.querySelector("#nextWordBtn")?.addEventListener("click", () => {
    appState.vocabularyIndex = Math.min(
      vocabulary.length - 1,
      appState.vocabularyIndex + 1,
    );
    saveProgress();
    renderVocabulary(container, {
      appState,
      speak,
      showToast,
      animateCorrect,
      completeScreen,
      saveProgress,
      goTo,
    });
  });

  container.querySelector("#startQuizBtn")?.addEventListener("click", () => {
    showToast("Great!");
    goTo("whats-this");
  });
}
