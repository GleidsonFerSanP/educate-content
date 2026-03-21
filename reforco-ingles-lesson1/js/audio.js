let currentUtterance = null;

export function speak(text, options = {}) {
  if (!window.speechSynthesis) return false;

  stopSpeak();
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = options.lang || "en-US";
  currentUtterance.rate = options.rate ?? 0.82;
  currentUtterance.pitch = options.pitch ?? 1.0;
  window.speechSynthesis.speak(currentUtterance);
  return true;
}

export function speakAsync(text, options = {}) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      resolve(false);
      return;
    }

    stopSpeak();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = options.lang || "en-US";
    currentUtterance.rate = options.rate ?? 0.82;
    currentUtterance.pitch = options.pitch ?? 1.0;
    currentUtterance.onend = () => resolve(true);
    currentUtterance.onerror = () => resolve(false);
    window.speechSynthesis.speak(currentUtterance);
  });
}

export function stopSpeak() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}
