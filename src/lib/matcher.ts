import { sessions, type Session } from "@/data/sessions";

export type Density = "packed" | "balanced" | "spacious";

export type Answers = {
  categories: string[];
  keywords: string[];
  density: Density;
  companies?: string[]; // hook for future use
};

export type ScoredSession = Session & {
  score: number;
  startMin: number;
  endMin: number;
  matchedCategory: string | null;
  matchedKeywords: string[];
};

const TIME_RE = /^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/;

export function parseTime(time: string): { startMin: number; endMin: number } | null {
  const m = TIME_RE.exec(time.trim());
  if (!m) return null;
  const startMin = Number(m[1]) * 60 + Number(m[2]);
  const endMin = Number(m[3]) * 60 + Number(m[4]);
  if (endMin <= startMin) return null;
  return { startMin, endMin };
}

export const schedulableSessions = sessions.filter((s) => parseTime(s.time) !== null);

export const allCategories = Array.from(
  new Set(sessions.map((s) => s.category).filter(Boolean)),
).sort((a, b) => (a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b)));

export function topKeywords(limit = 12): string[] {
  const counts = new Map<string, number>();
  for (const s of sessions) {
    for (const k of s.keywords) counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([k]) => k);
}

export function scoreSessions(answers: Answers): ScoredSession[] {
  const cats = new Set(answers.categories);
  const kws = new Set(answers.keywords.map((k) => k.toLowerCase()));
  const companies = new Set((answers.companies ?? []).map((c) => c.toLowerCase()));

  return schedulableSessions
    .map((s) => {
      const t = parseTime(s.time)!;
      const matchedCategory = cats.has(s.category) ? s.category : null;
      const matchedKeywords = s.keywords.filter((k) => kws.has(k.toLowerCase()));
      let score = 0;
      if (matchedCategory) score += 3;
      score += 2 * matchedKeywords.length;
      if (s.company && companies.has(s.company.toLowerCase())) score += 1;
      return { ...s, ...t, score, matchedCategory, matchedKeywords };
    })
    .sort((a, b) => b.score - a.score || a.startMin - b.startMin || a.title.localeCompare(b.title));
}

export const gapFor = (density: Density) =>
  density === "spacious" ? 20 : density === "balanced" ? 5 : 0;

export const maxSessionsFor = (density: Density) =>
  density === "packed" ? 99 : density === "balanced" ? 8 : 5;

function clashes(a: ScoredSession, picked: ScoredSession[], gap: number) {
  return picked.some((p) => a.startMin < p.endMin + gap && p.startMin < a.endMin + gap);
}

export function buildSchedule(answers: Answers): ScoredSession[] {
  const scored = scoreSessions(answers);
  const gap = gapFor(answers.density);
  const max = maxSessionsFor(answers.density);
  const picked: ScoredSession[] = [];
  for (const s of scored) {
    if (picked.length >= max) break;
    if (s.score <= 0) continue;
    if (!clashes(s, picked, gap)) picked.push(s);
  }
  // If interests were sparse, fill remaining free slots with unscored sessions.
  if (picked.length === 0) {
    for (const s of scored) {
      if (picked.length >= max) break;
      if (!clashes(s, picked, gap)) picked.push(s);
    }
  }
  return picked.sort((a, b) => a.startMin - b.startMin);
}

export function alternativesFor(
  target: ScoredSession,
  schedule: ScoredSession[],
  answers: Answers,
): ScoredSession[] {
  const gap = gapFor(answers.density);
  const others = schedule.filter((s) => s.id !== target.id);
  return scoreSessions(answers)
    .filter((s) => s.id !== target.id && !clashes(s, others, gap))
    .slice(0, 6);
}

export function matchPercent(schedule: ScoredSession[], answers: Answers): number {
  if (schedule.length === 0) return 0;
  const perSessionMax = 3 + 2 * Math.min(answers.keywords.length, 4);
  if (perSessionMax === 0) return 0;
  const got = schedule.reduce((sum, s) => sum + Math.min(s.score, perSessionMax), 0);
  return Math.round((got / (schedule.length * perSessionMax)) * 100);
}

export function whyLine(s: ScoredSession): string {
  const parts: string[] = [];
  if (s.matchedCategory) parts.push(s.matchedCategory);
  if (s.matchedKeywords.length) parts.push(s.matchedKeywords.join(", "));
  return parts.length ? `Matches: ${parts.join(" · ")}` : "Fills a free slot in your day";
}

export const totalSessions = schedulableSessions.length;
