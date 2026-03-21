import { swimmingDialogue } from "../data.js";

let guidedRunning = false;

export function renderSwimmingClass(
  container,
  { speak, speakAsync, stopSpeak, completeScreen, goTo },
) {
  completeScreen("swimming-class");

  container.innerHTML = `
    <section class="card scene-card screen-enter">
      <div class="pool-stage">
        <div class="pool-water floating-wave">
          <div class="pool-swimmers" aria-hidden="true">
            <span>🏊</span>
            <span>🏊</span>
            <span>🏊</span>
          </div>
          <div class="pool-laps">
            <span class="lap-badge">One more lap</span>
            <span class="lap-badge">Two more laps</span>
            <span class="lap-badge">Four more laps</span>
          </div>
        </div>

        <div class="center">
          <h2>Swimming Class</h2>
          <p class="hint">Listen and repeat the pool dialogue.</p>
        </div>

        <article class="tip-card" aria-label="Dica do dialogo">
          <button id="dialogueTipToggleBtn" class="tip-btn" aria-label="Mostrar dica do dialogo">💡 Mostrar tip do dialogo</button>
          <div id="dialogueTipContent" class="tip-content is-hidden">
            <p>Primeiro ouca a fala em ingles. Depois repita com calma. Aqui a licao pratica <strong>tired</strong>, <strong>fine</strong> e <strong>laps</strong>.</p>
            <button id="dialogueTipAudioBtn" class="tip-btn" aria-label="Ouvir dica do dialogo">🔊 Ouvir dica</button>
            <button id="guidedPlayBtn" class="tip-btn" aria-label="Iniciar escuta guiada">▶️ Escuta guiada</button>
            <button id="guidedStopBtn" class="tip-btn" aria-label="Parar escuta guiada">⏹️ Parar escuta guiada</button>
          </div>
        </article>

        <div id="dialogueList"></div>

        <div class="choice-list">
          <button id="petShopBtn" class="btn btn-primary btn-block" aria-label="Go to pet shop story">Go to pet shop story</button>
        </div>
      </div>
    </section>
  `;

  const tips = {
    "Are you tired, Phil?": "A pergunta quer dizer: voce esta cansado, Phil?",
    "Yes, I am.": "Resposta curta para confirmar: sim, eu estou.",
    "What about you, Fred?": "Agora a pergunta vai para outra pessoa: e voce, Fred?",
    "I’m not tired. I’m fine.": "Aqui a resposta mostra o contrario: nao estou cansado. Estou bem.",
    "Come on, boys. Two more laps.": "O instrutor pede mais duas voltas na piscina.",
    "OK. OK.": "Resposta curta para continuar a atividade.",
  };

  const tipToggleBtn = container.querySelector("#dialogueTipToggleBtn");
  const tipContent = container.querySelector("#dialogueTipContent");

  tipToggleBtn?.addEventListener("click", () => {
    const isHidden = tipContent?.classList.toggle("is-hidden");
    tipToggleBtn.textContent = isHidden
      ? "💡 Mostrar tip do dialogo"
      : "💡 Ocultar tip do dialogo";
  });

  container.querySelector("#dialogueTipAudioBtn")?.addEventListener("click", () => {
    speak(
      "Dica: tired e cansado, fine e estou bem, laps sao voltas na piscina.",
      { lang: "pt-BR", rate: 0.95, pitch: 1.0 },
    );
  });

  container.querySelector("#guidedPlayBtn")?.addEventListener("click", async () => {
    if (guidedRunning) return;
    guidedRunning = true;

    for (const line of swimmingDialogue) {
      if (!guidedRunning) break;
      await speakAsync(line.text, { lang: "en-US", rate: 0.8, pitch: 1.0 });
      if (!guidedRunning) break;
      await speakAsync(tips[line.text] || "Repita a frase em voz alta.", {
        lang: "pt-BR",
        rate: 0.92,
        pitch: 1.0,
      });
    }

    guidedRunning = false;
  });

  container.querySelector("#guidedStopBtn")?.addEventListener("click", () => {
    guidedRunning = false;
    stopSpeak();
  });

  const list = container.querySelector("#dialogueList");
  swimmingDialogue.forEach((line) => {
    const row = document.createElement("div");
    row.className = "dialogue-line";
    row.innerHTML = `
      <div class="dialogue-row-top">
        <span class="dialogue-speaker">${line.speaker}:</span>
        <span class="dialogue-text">${line.text}</span>
      </div>
      <p class="dialogue-tip-text is-hidden">💡 ${tips[line.text] || "Repita a frase em voz alta."}</p>
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
      speak(tips[line.text] || "Repita a frase em voz alta.", {
        lang: "pt-BR",
        rate: 0.95,
        pitch: 1.0,
      });
    });

    list.appendChild(row);
  });

  container.querySelector("#petShopBtn")?.addEventListener("click", () => {
    guidedRunning = false;
    stopSpeak();
    goTo("pet-shop");
  });
}
