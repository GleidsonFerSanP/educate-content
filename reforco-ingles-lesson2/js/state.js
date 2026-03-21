import { ROUTES } from "./data.js";

const STORAGE_KEY = "lesson2_progress_v1";

export const appState = {
  route: "home",
  completedScreens: [],
  score: 0,
  vocabularyIndex: 0,
  instructorIndex: 0,
  countingIndex: 0,
  whatsThisIndex: 0,
  finalQuizIndex: 0,
  finalQuizScore: 0,
  foundKitten: false,
  openedCushions: [],
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
      instructorIndex: appState.instructorIndex,
      countingIndex: appState.countingIndex,
      whatsThisIndex: appState.whatsThisIndex,
      foundKitten: appState.foundKitten,
      openedCushions: appState.openedCushions,
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
    appState.instructorIndex = data.instructorIndex ?? 0;
    appState.countingIndex = data.countingIndex ?? 0;
    appState.whatsThisIndex = data.whatsThisIndex ?? 0;
    appState.foundKitten = data.foundKitten ?? false;
    appState.openedCushions = data.openedCushions ?? [];
  } catch (_) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function resetAll() {
  appState.route = "home";
  appState.completedScreens = [];
  appState.score = 0;
  appState.vocabularyIndex = 0;
  appState.instructorIndex = 0;
  appState.countingIndex = 0;
  appState.whatsThisIndex = 0;
  appState.finalQuizIndex = 0;
  appState.finalQuizScore = 0;
  appState.foundKitten = false;
  appState.openedCushions = [];
  localStorage.removeItem(STORAGE_KEY);
}
