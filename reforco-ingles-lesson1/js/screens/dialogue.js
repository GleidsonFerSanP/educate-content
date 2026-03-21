import { dialogue } from "../data.js";

let guidedRunning = false;

export function renderDialogue(
  container,
  { speak, speakAsync, stopSpeak, completeScreen, goTo },
) {
  completeScreen("dialogue");

  const lineTips = {
    "Hi.": "Hi é um cumprimento curto, como dizer oi.",
    "Hey. Come in.": "Hey também é oi. Come in quer dizer entre.",
    "What’s this?": "What’s this significa: o que é isto?",
    "It’s a surprise.": "Surprise significa surpresa.",
    "Is it a book?": "Is it a book significa: é um livro?",
    "Yes, it is.": "Yes, it is significa: sim, é.",
    "Is it about cars?": "About cars significa sobre carros.",
    "No, it’s not.": "No, it’s not significa: não, não é.",
    "Oh! It’s about dinosaurs!":
      "Aqui aparece a descoberta: é sobre dinossauros.",
    "Thanks a lot.": "Thanks a lot significa muito obrigado.",
    "You’re welcome.": "You’re welcome é uma resposta educada: de nada.",
  };

  container.innerHTML = `
    <section class="card screen-enter">
      <h2>Dialogue</h2>
      <p class="hint">Mike + Grandpa</p>
      <article class="tip-card" aria-label="Dica de diálogo">
        <button id="dialogueTipToggleBtn" class="tip-btn" aria-label="Mostrar dica do diálogo">💡 Mostrar tip do diálogo</button>
        <div id="dialogueTipContent" class="tip-content is-hidden">
          <p>Leia uma fala por vez. Primeiro ouça em inglês, depois ouça a dica em português para entender o sentido da conversa.</p>
          <button id="dialogueTipAudioBtn" class="tip-btn" aria-label="Ouvir dica do diálogo">🔊 Ouvir dica do diálogo</button>
          <div style="display:grid; gap:8px; margin-top:8px;">
            <button id="guidedPlayBtn" class="tip-btn" aria-label="Iniciar escuta guiada">▶️ Escuta guiada</button>
            <button id="guidedStopBtn" class="tip-btn" aria-label="Parar escuta guiada">⏹️ Parar escuta guiada</button>
          </div>
        </div>
      </article>
      <div id="dialogueList"></div>
      <button id="chantBtn" class="btn btn-primary btn-block" aria-label="Go to chant" style="margin-top:10px;">Go to chant</button>
    </section>
  `;

  const dialogueTipToggleBtn = container.querySelector("#dialogueTipToggleBtn");
  const dialogueTipContent = container.querySelector("#dialogueTipContent");

  dialogueTipToggleBtn?.addEventListener("click", () => {
    const isHidden = dialogueTipContent?.classList.toggle("is-hidden");
    dialogueTipToggleBtn.textContent = isHidden
      ? "💡 Mostrar tip do diálogo"
      : "💡 Ocultar tip do diálogo";
  });

  container
    .querySelector("#dialogueTipAudioBtn")
    ?.addEventListener("click", () => {
      speak(
        "Dica: o diálogo começa com cumprimento, depois pergunta o que é, e termina com agradecimento.",
        { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
      );
    });

  container
    .querySelector("#guidedPlayBtn")
    ?.addEventListener("click", async () => {
      if (guidedRunning) return;
      guidedRunning = true;

      for (const line of dialogue) {
        if (!guidedRunning) break;

        await speakAsync(line.text, { lang: "en-US", rate: 0.8, pitch: 1.0 });
        if (!guidedRunning) break;

        const tip =
          lineTips[line.text] || "Leia com calma e repita em voz alta.";
        await speakAsync(tip, { lang: "pt-BR", rate: 0.9, pitch: 1.0 });
        if (!guidedRunning) break;
      }

      guidedRunning = false;
    });

  container.querySelector("#guidedStopBtn")?.addEventListener("click", () => {
    guidedRunning = false;
    stopSpeak();
  });

  const list = container.querySelector("#dialogueList");
  dialogue.forEach((line) => {
    const tip = lineTips[line.text] || "Leia com calma e repita em voz alta.";

    const row = document.createElement("div");
    row.className = "dialogue-line";
    row.innerHTML = `
      <div class="dialogue-row-top">
        <span class="dialogue-speaker">${line.speaker}:</span>
        <span class="dialogue-text">${line.text}</span>
      </div>
      <p class="dialogue-tip-text is-hidden">💡 ${tip}</p>
      <div class="dialogue-actions">
        <button class="btn btn-secondary" style="min-height:36px; padding:8px 10px;" aria-label="Listen line">Listen</button>
        <button class="btn btn-primary" style="min-height:36px; padding:8px 10px;" aria-label="Mostrar dica da fala">Mostrar tip</button>
      </div>
    `;

    const buttons = row.querySelectorAll("button");
    const listenBtn = buttons[0];
    const tipBtn = buttons[1];
    const tipText = row.querySelector(".dialogue-tip-text");

    listenBtn?.addEventListener("click", () => speak(line.text));
    tipBtn?.addEventListener("click", () => {
      const isHidden = tipText?.classList.toggle("is-hidden");
      tipBtn.textContent = isHidden ? "Mostrar tip" : "Ocultar tip";
      speak(tip, { lang: "pt-BR", rate: 0.95, pitch: 1.0 });
    });

    list.appendChild(row);
  });

  container.querySelector("#chantBtn")?.addEventListener("click", () => {
    guidedRunning = false;
    stopSpeak();
    goTo("chant");
  });
}
