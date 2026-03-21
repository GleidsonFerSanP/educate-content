import { countingQuestions } from "../data.js";

function buildOptions(answer) {
  const pool = ["one", "two", "three", "four", "five", "six"].filter(
    (item) => item !== answer,
  );
  const extra = pool.sort(() => Math.random() - 0.5).slice(0, 2);
  return [answer, ...extra].sort(() => Math.random() - 0.5);
}

export function renderCounting(
  container,
  { appState, showToast, animateCorrect, animateWrong, completeScreen, goTo, speak },
) {
  completeScreen("counting");
  const question = countingQuestions[appState.countingIndex];

  if (!question) {
    goTo("whats-this");
    return;
  }

  const options = buildOptions(question.answer);
  const visual = Array.from({ length: question.count })
    .map(() => `<span class="counter-item" aria-hidden="true">${question.emoji}</span>`)
    .join("");

  container.innerHTML = `
    <section class="card center screen-enter">
      <h2>Counting</h2>
      <p class="hint">Look, count, and choose the right answer.</p>
      <div class="counter-visual">${visual}</div>
      <h3 class="question-title">${question.prompt}</h3>
      <div class="choice-list">
        ${options
          .map(
            (option) =>
              `<button class="btn btn-secondary btn-block optionBtn" data-option="${option}" aria-label="Option ${option}">${option}</button>`,
          )
          .join("")}
      </div>
      <article class="tip-card" aria-label="Dica da contagem">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Conte um por um. Depois escolha a palavra em ingles para o numero certo.</p>
          <button id="tipAudioBtn" class="tip-btn" aria-label="Ouvir dica">🔊 Ouvir dica</button>
        </div>
      </article>
    </section>
  `;

  const tipToggleBtn = container.querySelector("#tipToggleBtn");
  const tipContent = container.querySelector("#tipContent");

  tipToggleBtn?.addEventListener("click", () => {
    const isHidden = tipContent?.classList.toggle("is-hidden");
    tipToggleBtn.textContent = isHidden ? "💡 Mostrar tip" : "💡 Ocultar tip";
  });

  container.querySelector("#tipAudioBtn")?.addEventListener("click", () => {
    speak(
      "Dica: conte as figuras com calma e escolha one, two, three, four, five, ou six.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  [...container.querySelectorAll(".optionBtn")].forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.option;
      if (selected === question.answer) {
        appState.score += 1;
        showToast(`Great! ${question.answer}.`);
        animateCorrect(button);
        setTimeout(() => {
          appState.countingIndex += 1;
          renderCounting(container, {
            appState,
            showToast,
            animateCorrect,
            animateWrong,
            completeScreen,
            goTo,
            speak,
          });
        }, 280);
      } else {
        showToast("Try again!");
        animateWrong(button);
      }
    });
  });
}
