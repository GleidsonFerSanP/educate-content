import { vocabulary } from "../data.js";

export function renderWordsFirst(
  container,
  { appState, speak, animateCorrect, completeScreen, saveProgress, goTo, showToast },
) {
  completeScreen("words-first");
  const item = vocabulary[appState.vocabularyIndex];

  container.innerHTML = `
    <section class="grid grid-2 screen-enter">
      <article class="card word-card" id="wordCard" tabindex="0" aria-label="Vocabulary card">
        <div class="category-pill">${item.category}</div>
        <div class="word-emoji" aria-hidden="true">${item.emoji}</div>
        <div class="word-label">${item.label}</div>
        <p class="hint">Tap to listen</p>
      </article>

      <article class="card">
        <h3>Words First ${appState.vocabularyIndex + 1} / ${vocabulary.length}</h3>
        <p class="hint">See the picture, hear the word, and repeat.</p>
        <div class="choice-list">
          <button id="listenBtn" class="btn btn-secondary btn-block" aria-label="Play word audio">Listen</button>
          <button id="prevWordBtn" class="btn btn-secondary btn-block" aria-label="Previous word">Previous word</button>
          <button id="nextWordBtn" class="btn btn-primary btn-block" aria-label="Next word">Next word</button>
          <button id="goInstructorsBtn" class="btn btn-success btn-block" aria-label="Go to instructors activity">Go to Are you a...?</button>
        </div>
        <p class="mini-note">Category: <strong>${item.category}</strong></p>
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
  container.querySelector("#listenBtn")?.addEventListener("click", play);

  container.querySelector("#prevWordBtn")?.addEventListener("click", () => {
    appState.vocabularyIndex = Math.max(0, appState.vocabularyIndex - 1);
    saveProgress();
    renderWordsFirst(container, {
      appState,
      speak,
      animateCorrect,
      completeScreen,
      saveProgress,
      goTo,
      showToast,
    });
  });

  container.querySelector("#nextWordBtn")?.addEventListener("click", () => {
    appState.vocabularyIndex = Math.min(vocabulary.length - 1, appState.vocabularyIndex + 1);
    saveProgress();
    renderWordsFirst(container, {
      appState,
      speak,
      animateCorrect,
      completeScreen,
      saveProgress,
      goTo,
      showToast,
    });
  });

  container.querySelector("#goInstructorsBtn")?.addEventListener("click", () => {
    showToast("Great!");
    goTo("instructors");
  });
}
