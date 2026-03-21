import { whatIsItQuestions } from "../data.js";

export function renderWhatsThis(
  container,
  { appState, showToast, animateCorrect, animateWrong, completeScreen, goTo, speak },
) {
  completeScreen("whats-this");
  const question = whatIsItQuestions[appState.whatsThisIndex];

  if (!question) {
    goTo("final-quiz");
    return;
  }

  container.innerHTML = `
    <section class="card screen-enter">
      <div class="center">
        <div class="word-emoji" aria-hidden="true">${question.emoji}</div>
        <h2 class="question-title">${question.prompt}</h2>
      </div>
      <div class="choice-list">
        ${question.options
          .map(
            (option) =>
              `<button class="btn btn-secondary btn-block optionBtn" data-option="${option}" aria-label="Option ${option}">${option}</button>`,
          )
          .join("")}
      </div>
      <article class="tip-card" aria-label="Dica do exercicio">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Olhe a figura e escolha a palavra certa em ingles.</p>
          <button id="tipAudioBtn" class="tip-btn" aria-label="Ouvir dica">🔊 Ouvir dica</button>
        </div>
      </article>
      <button id="nextQuestionBtn" class="btn btn-primary btn-block" style="margin-top:10px; display:none;" aria-label="Next question">Next question</button>
    </section>
  `;

  const nextBtn = container.querySelector("#nextQuestionBtn");
  const tipToggleBtn = container.querySelector("#tipToggleBtn");
  const tipContent = container.querySelector("#tipContent");

  tipToggleBtn?.addEventListener("click", () => {
    const isHidden = tipContent?.classList.toggle("is-hidden");
    tipToggleBtn.textContent = isHidden ? "💡 Mostrar tip" : "💡 Ocultar tip";
  });

  container.querySelector("#tipAudioBtn")?.addEventListener("click", () => {
    speak(
      "Dica: pense no nome da figura em ingles e escolha a opcao certa.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  [...container.querySelectorAll(".optionBtn")].forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.option;
      if (selected === question.answer) {
        appState.score += 1;
        showToast(`Great! It’s a ${question.answer}.`);
        animateCorrect(button);
        nextBtn.style.display = "block";
        [...container.querySelectorAll(".optionBtn")].forEach((btn) => {
          btn.disabled = true;
        });
      } else {
        showToast("Let's try again!");
        animateWrong(button);
      }
    });
  });

  nextBtn?.addEventListener("click", () => {
    appState.whatsThisIndex += 1;
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
