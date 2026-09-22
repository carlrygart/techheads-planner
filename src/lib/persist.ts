import type { Answers } from "./matcher";

const KEY = "techheads-matcher-v1";

export type Saved = { answers: Answers; scheduleIds: string[] };

export function loadSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Saved;
    if (!parsed?.answers?.density || !Array.isArray(parsed.scheduleIds)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: Saved) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* localStorage blocked — the app keeps working in memory */
  }
}

export function clearSaved() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
