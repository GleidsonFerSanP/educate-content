import { ROUTES } from "./data.js";
import { appState, getRouteIndex } from "./state.js";

export function setProgressBar() {
  const progressBar = document.getElementById("progressBar");
  if (!progressBar) return;
  const total = ROUTES.length - 1;
  const current = getRouteIndex(appState.route);
  const pct = Math.max(0, Math.min(100, (current / total) * 100));
  progressBar.style.width = `${pct}%`;
}

export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1400);
}

export function animateCorrect(element) {
  if (!element) return;
  element.classList.add("correct-pop");
  setTimeout(() => element.classList.remove("correct-pop"), 320);
}

export function animateWrong(element) {
  if (!element) return;
  element.classList.add("wrong-shake");
  setTimeout(() => element.classList.remove("wrong-shake"), 220);
}
