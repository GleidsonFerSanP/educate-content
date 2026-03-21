import { instructorQuestions } from "../data.js";

export function renderInstructors(
  container,
  { appState, showToast, animateCorrect, animateWrong, completeScreen, goTo, speak },
) {
  completeScreen("instructors");
  const question = instructorQuestions[appState.instructorIndex];

  if (!question) {
    goTo("swimming-class");
    return;
  }

  container.innerHTML = `
    <section class="card center screen-enter">
      <div class="word-emoji" aria-hidden="true">${question.emoji}</div>
      <h2 class="question-title">${question.question}</h2>
      <div class="choice-list">
        <button id="yesBtn" class="btn btn-success btn-block" aria-label="Yes I am">Yes, I am.</button>
        <button id="noBtn" class="btn btn-error btn-block" aria-label="No I am not">No, I’m not.</button>
      </div>
      <article class="tip-card" aria-label="Dica do exercicio">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Quando a imagem combina com a profissao da pergunta, escolha <strong>Yes, I am.</strong>. Quando nao combina, escolha <strong>No, I’m not.</strong>.</p>
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
      "Dica: responda yes I am quando a figura combinar com a pergunta, e no I am not quando nao combinar.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  const resolve = (answer, target) => {
    if (answer === question.correct) {
      appState.score += 1;
      showToast("Nice!");
      animateCorrect(target);
      setTimeout(() => {
        appState.instructorIndex += 1;
        renderInstructors(container, {
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

  container.querySelector("#yesBtn")?.addEventListener("click", (event) => {
    resolve("yes", event.currentTarget);
  });
  container.querySelector("#noBtn")?.addEventListener("click", (event) => {
    resolve("no", event.currentTarget);
  });
}
