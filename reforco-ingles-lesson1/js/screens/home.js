export function renderHome(container, { goTo, completeScreen }) {
  completeScreen("home");
  container.innerHTML = `
    <section class="card center screen-enter">
      <h2>Hi. Hey. Come in.</h2>
      <p class="hint">Lesson 1 - A Book</p>
      <p>Mike + Grandpa</p>
      <div class="choice-list">
        <button id="startBtn" class="btn btn-primary btn-block" aria-label="Start">Start</button>
        <button id="examBtn" class="btn btn-secondary btn-block" aria-label="Take assessment">Take assessment</button>
      </div>
    </section>
  `;

  container
    .querySelector("#startBtn")
    ?.addEventListener("click", () => goTo("vocabulary"));

  container
    .querySelector("#examBtn")
    ?.addEventListener("click", () => goTo("exam"));
}
