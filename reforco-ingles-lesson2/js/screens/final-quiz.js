import { finalQuizQuestions } from "../data.js";

export function renderFinalQuiz(
  container,
  { appState, showToast, animateCorrect, animateWrong, completeScreen, resetAll, goTo, speak },
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
        <p>${appState.finalQuizScore >= 4 ? "Great job!" : "Nice work!"}</p>
        <div class="chip-row">
          <span class="chip">Score ${appState.score}</span>
          <span class="chip">${appState.foundKitten ? "Kitten found" : "Try pet shop again"}</span>
        </div>
        <div class="choice-list" style="margin-top:14px;">
          <button id="replayBtn" class="btn btn-primary btn-block" aria-label="Replay lesson">Replay</button>
          <button id="examBtn" class="btn btn-success btn-block" aria-label="Take assessment">Take assessment</button>
          <button id="hubBtn" class="btn btn-secondary btn-block" aria-label="Go to Educate hub">Go to hub</button>
        </div>
      </section>
    `;

    container.querySelector("#replayBtn")?.addEventListener("click", () => {
      resetAll();
      goTo("home");
    });
    container.querySelector("#examBtn")?.addEventListener("click", () => {
      goTo("exam");
    });

    container.querySelector("#hubBtn")?.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
    return;
  }

  container.innerHTML = `
    <section class="card center screen-enter">
      <h2>Final Quiz ${idx + 1} / ${finalQuizQuestions.length}</h2>
      <div class="word-emoji" aria-hidden="true">${question.emoji}</div>
      <h3 class="question-title">${question.prompt}</h3>
      <article class="tip-card" aria-label="Dica do quiz final">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>Leia com calma. Use a imagem, a historia e a contagem para escolher a melhor resposta.</p>
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
      "Dica: observe a figura e lembre da frase treinada durante a licao.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  const optionsContainer = container.querySelector("#quizOptions");
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "btn btn-secondary btn-block";
    button.textContent = option;
    button.setAttribute("aria-label", `Option ${option}`);
    button.addEventListener("click", () => {
      if (option === question.answer) {
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
