import { petShopDialogue } from "../data.js";

const KITTEN_CUSHION = "cushion-2";

export function renderPetShop(
  container,
  {
    appState,
    showToast,
    animateCorrect,
    animateWrong,
    completeScreen,
    goTo,
    saveProgress,
    speak,
  },
) {
  completeScreen("pet-shop");

  container.innerHTML = `
    <section class="card screen-enter">
      <div class="center">
        <div class="word-emoji" aria-hidden="true">🏪🐈</div>
        <h2>Pet Shop Story</h2>
        <p class="hint">Find the missing kitten under the right cushion.</p>
      </div>

      <div id="storyList"></div>

      <article class="tip-card" aria-label="Dica da historia">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Leia a historia: Kelly esta triste porque um kitten sumiu. Toque nas almofadas para procurar.</p>
          <button id="tipAudioBtn" class="tip-btn" aria-label="Ouvir dica">🔊 Ouvir dica</button>
        </div>
      </article>

      <div class="cushion-grid" id="cushionGrid">
        <button class="cushion-btn" data-id="cushion-1" aria-label="First cushion">Cushion A</button>
        <button class="cushion-btn" data-id="cushion-2" aria-label="Second cushion">Cushion B</button>
        <button class="cushion-btn" data-id="cushion-3" aria-label="Third cushion">Cushion C</button>
      </div>

      <div id="successBanner" class="success-banner" style="display:${appState.foundKitten ? "block" : "none"};">
        <strong>You found it!</strong> Look! It’s here, under this cushion.
      </div>

      <div class="choice-list">
        <button id="countingBtn" class="btn btn-primary btn-block" aria-label="Go to counting">Go to counting</button>
      </div>
    </section>
  `;

  const storyList = container.querySelector("#storyList");
  petShopDialogue.forEach((line) => {
    const row = document.createElement("div");
    row.className = "dialogue-line";
    row.innerHTML = `
      <div class="dialogue-row-top">
        <span class="dialogue-speaker">${line.speaker}:</span>
        <span class="dialogue-text">${line.text}</span>
      </div>
      <div class="dialogue-actions">
        <button class="btn btn-secondary" style="min-height:36px; padding:8px 10px;" aria-label="Listen line">Listen</button>
      </div>
    `;
    row.querySelector("button")?.addEventListener("click", () => speak(line.text));
    storyList.appendChild(row);
  });

  const tipToggleBtn = container.querySelector("#tipToggleBtn");
  const tipContent = container.querySelector("#tipContent");

  tipToggleBtn?.addEventListener("click", () => {
    const isHidden = tipContent?.classList.toggle("is-hidden");
    tipToggleBtn.textContent = isHidden ? "💡 Mostrar tip" : "💡 Ocultar tip";
  });

  container.querySelector("#tipAudioBtn")?.addEventListener("click", () => {
    speak(
      "Dica: one kitten is missing. Procure embaixo da cushion correta.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  const successBanner = container.querySelector("#successBanner");
  const cushionButtons = [...container.querySelectorAll(".cushion-btn")];

  cushionButtons.forEach((button) => {
    const id = button.dataset.id;
    if (appState.openedCushions.includes(id)) {
      button.textContent = id === KITTEN_CUSHION ? "🐈 Kitten!" : "No kitten";
      if (id === KITTEN_CUSHION) {
        button.classList.add("found", "reveal-glow");
      }
    }

    button.addEventListener("click", () => {
      if (!appState.openedCushions.includes(id)) {
        appState.openedCushions.push(id);
      }

      if (id === KITTEN_CUSHION) {
        appState.foundKitten = true;
        appState.score += 1;
        button.textContent = "🐈 Kitten!";
        button.classList.add("found", "reveal-glow");
        showToast("You found it!");
        animateCorrect(button);
        successBanner.style.display = "block";
        speak("Look! It’s here, under this cushion.");
      } else {
        button.textContent = "No kitten";
        showToast("Look again!");
        animateWrong(button);
      }

      saveProgress();
    });
  });

  container.querySelector("#countingBtn")?.addEventListener("click", () => {
    goTo("counting");
  });
}
