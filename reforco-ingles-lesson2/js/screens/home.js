export function renderHome(container, { goTo, completeScreen, speak }) {
  completeScreen("home");
  container.innerHTML = `
    <section class="card hero-card center screen-enter">
      <div class="word-emoji floating-wave" aria-hidden="true">🏊🐾</div>
      <h2>Swimming class, pet shop, and numbers</h2>
      <p class="hint">Lesson 2</p>
      <p>Listen, answer, count, and find the missing kitten.</p>
      <div class="chip-row">
        <span class="chip">Are you a...?</span>
        <span class="chip">How are you?</span>
        <span class="chip">One to six</span>
      </div>
      <div class="choice-list" style="margin-top:16px;">
        <button id="startBtn" class="btn btn-primary btn-block" aria-label="Start lesson">Start</button>
        <button id="listenBtn" class="btn btn-secondary btn-block" aria-label="Listen welcome message">Listen</button>
        <button id="examBtn" class="btn btn-success btn-block" aria-label="Take assessment">Take assessment</button>
      </div>
    </section>
  `;

  container.querySelector("#startBtn")?.addEventListener("click", () => {
    goTo("words-first");
  });

  container.querySelector("#listenBtn")?.addEventListener("click", () => {
    speak("Welcome! Let's swim, count, and find the missing kitten.");
  });

  container.querySelector("#examBtn")?.addEventListener("click", () => {
    goTo("exam");
  });
}
