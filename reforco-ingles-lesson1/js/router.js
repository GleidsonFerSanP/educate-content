import { ROUTES } from "./data.js";

export function parseRouteFromHash() {
  const hash = window.location.hash.replace("#/", "").trim();
  return ROUTES.includes(hash) ? hash : "home";
}

export function goTo(route) {
  const target = ROUTES.includes(route) ? route : "home";
  window.location.hash = `#/${target}`;
}
