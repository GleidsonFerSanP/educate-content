import { finalQuizQuestions } from "../data.js";

export function renderFinalQuiz(
  container,
  {
    appState,
    showToast,
    animateCorrect,
    animateWrong,
    completeScreen,
    resetAll,
    goTo,
    speak,
  },
) {
  completeScreen("final-quiz");

  const idx = appState.finalQuizIndex;
  const question = finalQuizQuestions[idx];

  if (!question) {
    const total = finalQuizQuestions.length;
    container.innerHTML = `
      <section class="card center screen-enter">
        <h2>Final Quiz</h2>
        <p class="score">${appState.finalQuizScore} / ${total}</p>
        <p>${appState.finalQuizScore >= 4 ? "Great!" : "Nice!"}</p>
        <button id="replayBtn" class="btn btn-primary btn-block" aria-label="Replay lesson">Replay</button>
      </section>
    `;

    container.querySelector("#replayBtn")?.addEventListener("click", () => {
      resetAll();
      goTo("home");
    });
    return;
  }

  container.innerHTML = `
    <section class="card center screen-enter">
      <h2>Final Quiz ${idx + 1} / ${finalQuizQuestions.length}</h2>
      <div class="word-emoji" aria-hidden="true">${question.emoji || "❓"}</div>
      <h3 class="question-title">${question.prompt}</h3>
      <article class="tip-card" aria-label="Dica do quiz final">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Leia com calma. Se for pergunta com “Is it...?”, pense em “sim” ou “não”. Se for “What’s this?”, observe a figura.</p>
          <button id="tipAudioBtn" class="tip-btn" aria-label="Ouvir dica">🔊 Ouvir dica</button>
        </div>
      </article>
      <div id="quizOptions" class="choice-list"></div>
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
      "Dica: use a imagem para ajudar. Em what is this escolha a palavra certa. Em is it responda yes ou no.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  const optionsContainer = container.querySelector("#quizOptions");
  const options =
    question.type === "yesno"
      ? [
          { label: "Yes, it is.", value: "yes", cls: "btn-success" },
          { label: "No, it’s not.", value: "no", cls: "btn-error" },
        ]
      : question.options.map((opt) => ({
          label: opt,
          value: opt,
          cls: "btn-secondary",
        }));

  options.forEach((opt) => {
    const button = document.createElement("button");
    button.className = `btn ${opt.cls} btn-block`;
    button.textContent = opt.label;
    button.setAttribute("aria-label", `Option ${opt.label}`);
    button.addEventListener("click", () => {
      if (opt.value === question.answer) {
        appState.finalQuizScore += 1;
        showToast("Good job!");
        animateCorrect(button);
      } else {
        showToast("Try again!");
        animateWrong(button);
      }

      setTimeout(() => {
        appState.finalQuizIndex += 1;
        renderFinalQuiz(container, {
          appState,
          showToast,
          animateCorrect,
          animateWrong,
          completeScreen,
          resetAll,
          goTo,
          speak,
        });
      }, 280);
    });
    optionsContainer.appendChild(button);
  });
}
