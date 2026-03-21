import { yesNoQuestions } from "../data.js";

export function renderYesNo(
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
  completeScreen("yes-no");
  const index = appState.yesNoIndex;
  const question = yesNoQuestions[index];

  if (!question) {
    goTo("about");
    return;
  }

  container.innerHTML = `
    <section class="card center screen-enter">
      <div class="word-emoji" aria-hidden="true">${question.emoji}</div>
      <h2 class="question-title">${question.question}</h2>
      <div class="choice-list">
        <button class="btn btn-success btn-block" id="yesBtn" aria-label="Yes it is">Yes, it is.</button>
        <button class="btn btn-error btn-block" id="noBtn" aria-label="No its not">No, it’s not.</button>
      </div>
      <article class="tip-card" aria-label="Dica do exercício">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Se a pergunta combina com a imagem, escolha “Yes, it is.”. Se não combina, escolha “No, it’s not.”.</p>
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
      "Dica: responda yes it is quando a pergunta estiver certa para a imagem, e no it is not quando estiver errada.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  const resolve = (answer, target) => {
    if (answer === question.correct) {
      appState.score += 1;
      showToast("Nice!");
      animateCorrect(target);
      setTimeout(() => {
        appState.yesNoIndex += 1;
        renderYesNo(container, {
          appState,
          showToast,
          animateCorrect,
          animateWrong,
          completeScreen,
          goTo,
          speak,
        });
      }, 260);
    } else {
      showToast("Almost!");
      animateWrong(target);
    }
  };

  container
    .querySelector("#yesBtn")
    ?.addEventListener("click", (event) => resolve("yes", event.currentTarget));
  container
    .querySelector("#noBtn")
    ?.addEventListener("click", (event) => resolve("no", event.currentTarget));
}
