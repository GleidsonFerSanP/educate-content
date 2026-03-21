export function renderHome(container, { goTo, completeScreen }) {
  completeScreen("home");
  container.innerHTML = `
    <section class="card center screen-enter">
      <h2>Hi. Hey. Come in.</h2>
      <p class="hint">Lesson 1 - A Book</p>
      <p>Mike + Grandpa</p>
      <button id="startBtn" class="btn btn-primary btn-block" aria-label="Start">Start</button>
    </section>
  `;

  container
    .querySelector("#startBtn")
    ?.addEventListener("click", () => goTo("vocabulary"));
}
