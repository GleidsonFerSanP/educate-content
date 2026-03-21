import { vocabulary } from "../data.js";

function buildOptions(correctLabel) {
  const pool = vocabulary.filter((item) => item.label !== correctLabel);
  const two = pool
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map((item) => item.label);
  return [correctLabel, ...two].sort(() => Math.random() - 0.5);
}

export function renderWhatsThis(
  container,
  {
    appState,
    showToast,
    animateCorrect,
    animateWrong,
    completeScreen,
    goTo,
    speak,
  },
) {
  completeScreen("whats-this");
  const idx = appState.whatsThisIndex % vocabulary.length;
  const item = vocabulary[idx];
  const options = buildOptions(item.label);

  container.innerHTML = `
    <section class="card screen-enter">
      <div class="center">
        <div class="word-emoji" aria-hidden="true">${item.emoji}</div>
        <h2 class="question-title">What’s this?</h2>
      </div>
      <div class="choice-list" id="choiceList">
        ${options
          .map(
            (option) =>
              `<button class="btn btn-secondary btn-block optionBtn" data-option="${option}" aria-label="Option ${option}">${option}</button>`,
          )
          .join("")}
      </div>
      <article class="tip-card" aria-label="Dica do exercício">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Olhe a figura e pense: “What’s this?” = “O que é isto?”. Escolha a palavra que combina com a imagem.</p>
          <button id="tipAudioBtn" class="tip-btn" aria-label="Ouvir dica">🔊 Ouvir dica</button>
        </div>
      </article>
      <button id="nextQuestionBtn" class="btn btn-primary btn-block" style="margin-top:10px; display:none;" aria-label="Next question">Next question</button>
    </section>
  `;

  const buttons = [...container.querySelectorAll(".optionBtn")];
  const nextBtn = container.querySelector("#nextQuestionBtn");
  const tipToggleBtn = container.querySelector("#tipToggleBtn");
  const tipContent = container.querySelector("#tipContent");

  tipToggleBtn?.addEventListener("click", () => {
    const isHidden = tipContent?.classList.toggle("is-hidden");
    tipToggleBtn.textContent = isHidden ? "💡 Mostrar tip" : "💡 Ocultar tip";
  });

  container.querySelector("#tipAudioBtn")?.addEventListener("click", () => {
    speak(
      "Dica: observe a imagem e escolha a palavra correta em inglês para responder what is this.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.option;
      if (selected === item.label) {
        appState.score += 1;
        showToast(`Great! It’s a ${item.label}.`);
        animateCorrect(button);
        nextBtn.style.display = "block";
        buttons.forEach((btn) => (btn.disabled = true));
      } else {
        showToast("Let’s try again!");
        animateWrong(button);
      }
    });
  });

  nextBtn?.addEventListener("click", () => {
    appState.whatsThisIndex += 1;
    if (appState.whatsThisIndex >= vocabulary.length) {
      goTo("yes-no");
      return;
    }
    renderWhatsThis(container, {
      appState,
      showToast,
      animateCorrect,
      animateWrong,
      completeScreen,
      goTo,
      speak,
    });
  });
}
