import { chantLines } from "../data.js";

let chantTimer = null;

export function renderChant(container, { speak, completeScreen, goTo }) {
  completeScreen("chant");

  container.innerHTML = `
    <section class="card screen-enter">
      <h2>Chant</h2>
      <p class="hint">Play and read</p>
      <div id="chantList"></div>
      <div class="choice-list" style="margin-top:10px;">
        <button id="playChantBtn" class="btn btn-success btn-block" aria-label="Play chant">Play</button>
        <button id="stopChantBtn" class="btn btn-error btn-block" aria-label="Stop chant">Pause</button>
        <button id="quizBtn" class="btn btn-primary btn-block" aria-label="Go to final quiz">Go to final quiz</button>
      </div>
    </section>
  `;

  const list = container.querySelector("#chantList");
  chantLines.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "karaoke-line";
    row.dataset.index = String(index);
    row.textContent = line;
    row.addEventListener("click", () => speak(line));
    list.appendChild(row);
  });

  function play() {
    clearInterval(chantTimer);
    let i = 0;
    const rows = [...container.querySelectorAll(".karaoke-line")];
    chantTimer = setInterval(() => {
      rows.forEach((row) => row.classList.remove("active"));
      const row = rows[i % rows.length];
      row.classList.add("active");
      speak(row.textContent || "");
      i += 1;
      if (i >= rows.length) {
        clearInterval(chantTimer);
      }
    }, 1100);
  }

  function pause() {
    clearInterval(chantTimer);
    chantTimer = null;
    [...container.querySelectorAll(".karaoke-line")].forEach((row) =>
      row.classList.remove("active"),
    );
  }

  container.querySelector("#playChantBtn")?.addEventListener("click", play);
  container.querySelector("#stopChantBtn")?.addEventListener("click", pause);
  container.querySelector("#quizBtn")?.addEventListener("click", () => {
    pause();
    goTo("final-quiz");
  });
}
