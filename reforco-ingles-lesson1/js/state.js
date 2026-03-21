import { ROUTES } from "./data.js";

const STORAGE_KEY = "lesson1_progress_v1";

export const appState = {
  route: "home",
  completedScreens: [],
  score: 0,
  vocabularyIndex: 0,
  whatsThisIndex: 0,
  yesNoIndex: 0,
  finalQuizIndex: 0,
  finalQuizScore: 0,
  aboutRevealed: false,
};

export function setRoute(route) {
  appState.route = ROUTES.includes(route) ? route : "home";
}

export function completeScreen(screen) {
  if (!appState.completedScreens.includes(screen)) {
    appState.completedScreens.push(screen);
  }
}

export function getRouteIndex(route = appState.route) {
  return ROUTES.indexOf(route);
}

export function getPrevRoute() {
  const idx = getRouteIndex();
  return idx > 0 ? ROUTES[idx - 1] : ROUTES[0];
}

export function getNextRoute() {
  const idx = getRouteIndex();
  return idx < ROUTES.length - 1 ? ROUTES[idx + 1] : ROUTES[ROUTES.length - 1];
}

export function saveProgress() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      completedScreens: appState.completedScreens,
      score: appState.score,
      vocabularyIndex: appState.vocabularyIndex,
    }),
  );
}

export function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    appState.completedScreens = data.completedScreens ?? [];
    appState.score = data.score ?? 0;
    appState.vocabularyIndex = data.vocabularyIndex ?? 0;
  } catch (_) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function resetAll() {
  appState.route = "home";
  appState.completedScreens = [];
  appState.score = 0;
  appState.vocabularyIndex = 0;
  appState.whatsThisIndex = 0;
  appState.yesNoIndex = 0;
  appState.finalQuizIndex = 0;
  appState.finalQuizScore = 0;
  appState.aboutRevealed = false;
  localStorage.removeItem(STORAGE_KEY);
}
