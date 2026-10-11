import type { Session } from "@/data/parse-program";
import { sessions } from "@/data/sessions";
import type { Database } from "@/integrations/supabase/types";
import { parseTime } from "@/lib/matcher";

export type PublicScheduleRow =
  Database["public"]["Functions"]["list_public_schedules"]["Returns"][number];

export type BrowseEntry = {
  id: string;
  name: string;
  owner: string;
  sessions: Session[];
  categories: string[];
  inCommon: number;
  updatedAt: string;
};

export type BrowseFilter = { query: string; category: string | null };

export type BrowseSort = "recent" | "in-common";

const startMin = (s: Session) => parseTime(s.time)?.startMin ?? Infinity;

export function toBrowseEntry(
  row: PublicScheduleRow,
  viewerSessionIds: string[],
  catalogue: Session[] = sessions,
): BrowseEntry {
  const byId = new Map(catalogue.map((s) => [s.id, s]));
  const resolved = Array.from(new Set(row.session_ids))
    .map((id) => byId.get(id))
    .filter((s): s is Session => s !== undefined)
    // `|| 0` keeps two untimed sessions (Infinity - Infinity = NaN) as a tie
    .sort((a, b) => startMin(a) - startMin(b) || 0);

  const counts = new Map<string, number>();
  for (const s of resolved) counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
  const categories = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([c]) => c);

  const viewer = new Set(viewerSessionIds);

  return {
    id: row.id,
    name: row.name,
    owner: row.display_name?.trim() || "Anonymous",
    sessions: resolved,
    categories,
    inCommon: resolved.filter((s) => viewer.has(s.id)).length,
    updatedAt: row.updated_at,
  };
}

export function filterEntries(entries: BrowseEntry[], filter: BrowseFilter): BrowseEntry[] {
  const q = filter.query.trim().toLowerCase();
  const matches = (text: string) => text.toLowerCase().includes(q);
  return entries.filter(
    (e) =>
      (filter.category === null || e.categories.includes(filter.category)) &&
      (!q ||
        matches(e.name) ||
        matches(e.owner) ||
        e.sessions.some((s) => matches(s.title) || matches(s.speaker))),
  );
}

const byRecent = (a: BrowseEntry, b: BrowseEntry) =>
  Date.parse(b.updatedAt) - Date.parse(a.updatedAt);

export function sortEntries(entries: BrowseEntry[], sort: BrowseSort): BrowseEntry[] {
  return [...entries].sort((a, b) =>
    sort === "in-common" ? b.inCommon - a.inCommon || byRecent(a, b) : byRecent(a, b),
  );
}
