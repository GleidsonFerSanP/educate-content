export function renderAbout(
  container,
  {
    appState,
    showToast,
    animateCorrect,
    animateWrong,
    completeScreen,
    speak,
    goTo,
  },
) {
  completeScreen("about");

  container.innerHTML = `
    <section class="card center screen-enter">
      <div class="word-emoji" aria-hidden="true">📘🚗🦖</div>
      <h2>Is it about cars?</h2>
      <div class="choice-list">
        <button id="yesAboutBtn" class="btn btn-success btn-block" aria-label="Yes it is">Yes, it is.</button>
        <button id="noAboutBtn" class="btn btn-error btn-block" aria-label="No its not">No, it’s not.</button>
      </div>
      <article class="tip-card" aria-label="Dica do exercício">
        <button id="tipToggleBtn" class="tip-btn" aria-label="Mostrar dica">💡 Mostrar tip</button>
        <div id="tipContent" class="tip-content is-hidden">
          <p>A palavra “about” significa “sobre”. Pense: “É um livro sobre carros?” para escolher a resposta.</p>
          <button id="tipAudioBtn" class="tip-btn" aria-label="Ouvir dica">🔊 Ouvir dica</button>
        </div>
      </article>
      <article id="reveal" class="card" style="display:none; margin-top:12px;">
        <p>No, it’s not.</p>
        <p><strong>Oh! It’s about dinosaurs!</strong></p>
        <button id="dialogueBtn" class="btn btn-primary btn-block" aria-label="Go to dialogue">Go to dialogue</button>
      </article>
    </section>
  `;

  const reveal = container.querySelector("#reveal");
  const yesBtn = container.querySelector("#yesAboutBtn");
  const noBtn = container.querySelector("#noAboutBtn");
  const tipToggleBtn = container.querySelector("#tipToggleBtn");
  const tipContent = container.querySelector("#tipContent");

  tipToggleBtn?.addEventListener("click", () => {
    const isHidden = tipContent?.classList.toggle("is-hidden");
    tipToggleBtn.textContent = isHidden ? "💡 Mostrar tip" : "💡 Ocultar tip";
  });

  container.querySelector("#tipAudioBtn")?.addEventListener("click", () => {
    speak(
      "Dica: about quer dizer sobre. Leia a pergunta e pense sobre qual assunto é o livro.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  yesBtn?.addEventListener("click", (event) => {
    showToast("Almost!");
    animateWrong(event.currentTarget);
  });

  noBtn?.addEventListener("click", (event) => {
    showToast("Great!");
    animateCorrect(event.currentTarget);
    appState.score += 1;
    reveal.style.display = "block";
    speak("Oh! It’s about dinosaurs!");
  });

  container
    .querySelector("#dialogueBtn")
    ?.addEventListener("click", () => goTo("dialogue"));
}
