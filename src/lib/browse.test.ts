import { describe, expect, it } from "vitest";

import type { Session } from "@/data/parse-program";
import { sessions as programme } from "@/data/sessions";
import {
  filterEntries,
  sortEntries,
  toBrowseEntry,
  type BrowseEntry,
  type PublicScheduleRow,
} from "@/lib/browse";

const session = (s: Partial<Session> & Pick<Session, "id" | "time" | "category">): Session => ({
  title: `Talk ${s.id}`,
  speaker: `Speaker ${s.id}`,
  description: "",
  location: "Main stage",
  company: "",
  keywords: [],
  ...s,
});

// "9:30" has a single-digit hour, so a plain string sort on `time` would put
// it after "11:00". Sorting must go through parseTime.
const intro = session({
  id: "0900-intro-to-llms",
  time: "09:00-09:30",
  category: "AI",
  title: "Intro to LLMs",
  speaker: "Ada Lovelace",
});
const zeroTrust = session({
  id: "0930-zero-trust",
  time: "9:30-10:00",
  category: "Security",
  title: "Zero trust networking",
  speaker: "Linus Torvalds",
});
const serverless = session({
  id: "1000-serverless",
  time: "10:00-10:45",
  category: "Cloud",
  title: "Serverless at scale",
  speaker: "Grace Hopper",
});
const agents = session({
  id: "1100-agents",
  time: "11:00-11:30",
  category: "AI",
  title: "Agents in production",
  speaker: "Alan Turing",
});
const threats = session({
  id: "1400-threat-modelling",
  time: "14:00-14:30",
  category: "Security",
  title: "Threat modelling",
  speaker: "Bruce Schneier",
});

const catalogue: Session[] = [intro, zeroTrust, serverless, agents, threats];

const row = (r: Partial<PublicScheduleRow> = {}): PublicScheduleRow => ({
  id: "sched-1",
  name: "My day",
  display_name: "Carl",
  session_ids: [],
  updated_at: "2026-10-01T10:00:00.000Z",
  ...r,
});

describe("toBrowseEntry", () => {
  it("copies id, name and updated_at from the row", () => {
    const entry = toBrowseEntry(
      row({ id: "abc", name: "AI track", updated_at: "2026-10-02T08:30:00.000Z" }),
      [],
      catalogue,
    );
    expect(entry.id).toBe("abc");
    expect(entry.name).toBe("AI track");
    expect(entry.updatedAt).toBe("2026-10-02T08:30:00.000Z");
  });

  it("uses the trimmed display name as owner", () => {
    expect(toBrowseEntry(row({ display_name: "  Carl R  " }), [], catalogue).owner).toBe("Carl R");
  });

  it("falls back to Anonymous when display_name is null", () => {
    expect(toBrowseEntry(row({ display_name: null }), [], catalogue).owner).toBe("Anonymous");
  });

  it("falls back to Anonymous when display_name is blank", () => {
    expect(toBrowseEntry(row({ display_name: "   " }), [], catalogue).owner).toBe("Anonymous");
  });

  it("resolves session ids against the catalogue and sorts them by start time", () => {
    const entry = toBrowseEntry(
      row({ session_ids: [agents.id, serverless.id, intro.id, zeroTrust.id] }),
      [],
      catalogue,
    );
    expect(entry.sessions).toEqual([intro, zeroTrust, serverless, agents]);
  });

  it("drops session ids that are not in the catalogue", () => {
    const entry = toBrowseEntry(
      row({ session_ids: ["ghost-session", serverless.id, "1999-removed-talk"] }),
      [],
      catalogue,
    );
    expect(entry.sessions).toEqual([serverless]);
  });

  it("returns empty sessions and categories when nothing resolves", () => {
    const entry = toBrowseEntry(row({ session_ids: ["ghost-session"] }), [], catalogue);
    expect(entry.sessions).toEqual([]);
    expect(entry.categories).toEqual([]);
    expect(entry.inCommon).toBe(0);
  });

  it("lists distinct categories by frequency, most common first", () => {
    const entry = toBrowseEntry(
      row({ session_ids: [intro.id, zeroTrust.id, threats.id, serverless.id] }),
      [],
      catalogue,
    );
    // Security x2, then AI and Cloud (x1 each) alphabetically.
    expect(entry.categories).toEqual(["Security", "AI", "Cloud"]);
  });

  it("breaks category frequency ties alphabetically", () => {
    const entry = toBrowseEntry(
      row({ session_ids: [zeroTrust.id, serverless.id, intro.id] }),
      [],
      catalogue,
    );
    expect(entry.categories).toEqual(["AI", "Cloud", "Security"]);
  });

  it("counts sessions also in the viewer's schedule as inCommon", () => {
    const entry = toBrowseEntry(
      row({ session_ids: [intro.id, serverless.id, agents.id] }),
      [intro.id, agents.id, threats.id],
      catalogue,
    );
    expect(entry.inCommon).toBe(2);
  });

  it("does not count unknown ids shared with the viewer as inCommon", () => {
    const entry = toBrowseEntry(
      row({ session_ids: ["ghost-session", intro.id] }),
      ["ghost-session", intro.id],
      catalogue,
    );
    expect(entry.inCommon).toBe(1);
  });

  it("is zero inCommon when the viewer has no sessions", () => {
    const entry = toBrowseEntry(row({ session_ids: [intro.id, agents.id] }), [], catalogue);
    expect(entry.inCommon).toBe(0);
  });

  it("sorts sessions with an unparseable time after all timed sessions", () => {
    const tba = session({ id: "tba-keynote", time: "TBA", category: "AI" });
    const blank = session({ id: "blank-panel", time: "", category: "Cloud" });
    const withUntimed = [...catalogue, tba, blank];
    const entry = toBrowseEntry(
      row({ session_ids: [tba.id, agents.id, blank.id, intro.id, serverless.id] }),
      [],
      withUntimed,
    );
    expect(entry.sessions.slice(0, 3)).toEqual([intro, serverless, agents]);
    expect(entry.sessions.slice(3)).toHaveLength(2);
    expect(entry.sessions.slice(3)).toEqual(expect.arrayContaining([tba, blank]));
  });

  // Duplicate ids in session_ids are de-duplicated: each session counts once.
  it("lists a session only once when its id is duplicated in session_ids", () => {
    const entry = toBrowseEntry(
      row({ session_ids: [serverless.id, serverless.id, intro.id] }),
      [],
      catalogue,
    );
    expect(entry.sessions).toEqual([intro, serverless]);
  });

  it("counts a duplicated session's category once", () => {
    const entry = toBrowseEntry(
      row({ session_ids: [serverless.id, serverless.id, intro.id] }),
      [],
      catalogue,
    );
    // Cloud x1 and AI x1 tie, so alphabetical: AI before Cloud.
    expect(entry.categories).toEqual(["AI", "Cloud"]);
  });

  it("counts a duplicated session once towards inCommon", () => {
    const entry = toBrowseEntry(
      row({ session_ids: [serverless.id, serverless.id, intro.id] }),
      [serverless.id],
      catalogue,
    );
    expect(entry.inCommon).toBe(1);
  });

  it("defaults the catalogue to the real programme", () => {
    const real = programme[0]!;
    const entry = toBrowseEntry(row({ session_ids: [real.id, "ghost-session"] }), [real.id]);
    expect(entry.sessions).toEqual([real]);
    expect(entry.categories).toEqual([real.category]);
    expect(entry.inCommon).toBe(1);
  });
});

const entry = (e: Partial<BrowseEntry> & Pick<BrowseEntry, "id">): BrowseEntry => ({
  name: `Schedule ${e.id}`,
  owner: "Anonymous",
  sessions: [],
  categories: [],
  inCommon: 0,
  updatedAt: "2026-10-01T10:00:00.000Z",
  ...e,
});

describe("filterEntries", () => {
  const aiDay = entry({
    id: "ai-day",
    name: "Deep dive into AI",
    owner: "Margaret",
    sessions: [intro, agents],
    categories: ["AI"],
  });
  const opsDay = entry({
    id: "ops-day",
    name: "Ops stuff",
    owner: "Carl",
    sessions: [zeroTrust, serverless],
    categories: ["Cloud", "Security"],
  });
  const mixed = entry({
    id: "mixed",
    name: "A bit of everything",
    owner: "Anonymous",
    sessions: [intro, threats],
    categories: ["AI", "Security"],
  });
  const all = [aiDay, opsDay, mixed];
  const ids = (es: BrowseEntry[]) => es.map((e) => e.id);

  it("returns every entry in order when query is empty and category is null", () => {
    expect(ids(filterEntries(all, { query: "", category: null }))).toEqual([
      "ai-day",
      "ops-day",
      "mixed",
    ]);
  });

  it("treats a whitespace-only query as no query", () => {
    expect(ids(filterEntries(all, { query: "   ", category: null }))).toEqual([
      "ai-day",
      "ops-day",
      "mixed",
    ]);
  });

  it("matches the schedule name case-insensitively", () => {
    expect(ids(filterEntries(all, { query: "DEEP DIVE", category: null }))).toEqual(["ai-day"]);
  });

  it("matches the owner", () => {
    expect(ids(filterEntries(all, { query: "carl", category: null }))).toEqual(["ops-day"]);
  });

  it("matches a session title", () => {
    expect(ids(filterEntries(all, { query: "serverless", category: null }))).toEqual(["ops-day"]);
  });

  it("matches a session speaker", () => {
    expect(ids(filterEntries(all, { query: "ada love", category: null }))).toEqual([
      "ai-day",
      "mixed",
    ]);
  });

  it("trims the query before matching", () => {
    expect(ids(filterEntries(all, { query: "  turing  ", category: null }))).toEqual(["ai-day"]);
  });

  it("returns nothing when no entry matches the query", () => {
    expect(filterEntries(all, { query: "kubernetes", category: null })).toEqual([]);
  });

  it("keeps only entries that include the category", () => {
    expect(ids(filterEntries(all, { query: "", category: "Security" }))).toEqual([
      "ops-day",
      "mixed",
    ]);
  });

  it("returns nothing for a category no entry has", () => {
    expect(filterEntries(all, { query: "", category: "Design" })).toEqual([]);
  });

  it("requires both query and category to match when both are set", () => {
    expect(ids(filterEntries(all, { query: "ada", category: "Security" }))).toEqual(["mixed"]);
  });
});

describe("sortEntries", () => {
  const older = entry({ id: "older", inCommon: 3, updatedAt: "2026-09-01T09:00:00.000Z" });
  const newest = entry({ id: "newest", inCommon: 1, updatedAt: "2026-10-05T09:00:00.000Z" });
  const middle = entry({ id: "middle", inCommon: 3, updatedAt: "2026-09-20T09:00:00.000Z" });
  const none = entry({ id: "none", inCommon: 0, updatedAt: "2026-10-04T09:00:00.000Z" });
  const input = [older, newest, middle, none];
  const ids = (es: BrowseEntry[]) => es.map((e) => e.id);

  it("orders by most recently updated first for 'recent'", () => {
    expect(ids(sortEntries(input, "recent"))).toEqual(["newest", "none", "middle", "older"]);
  });

  it("orders by most sessions in common for 'in-common', ties by most recent", () => {
    expect(ids(sortEntries(input, "in-common"))).toEqual(["middle", "older", "newest", "none"]);
  });

  it("compares updatedAt as instants, not strings, across timezone offsets", () => {
    // 12:00+02:00 is 10:00Z, earlier than 11:00Z, though it sorts later as a string.
    const offset = entry({ id: "offset", updatedAt: "2026-10-01T12:00:00+02:00" });
    const utc = entry({ id: "utc", updatedAt: "2026-10-01T11:00:00.123456+00:00" });
    expect(ids(sortEntries([offset, utc], "recent"))).toEqual(["utc", "offset"]);
    expect(ids(sortEntries([utc, offset], "recent"))).toEqual(["utc", "offset"]);
  });

  it("does not mutate the input array", () => {
    const before = [...input];
    const recent = sortEntries(input, "recent");
    const common = sortEntries(input, "in-common");
    expect(input).toEqual(before);
    expect(recent).not.toBe(input);
    expect(common).not.toBe(input);
  });

  it("returns an empty array for no entries", () => {
    expect(sortEntries([], "recent")).toEqual([]);
    expect(sortEntries([], "in-common")).toEqual([]);
  });
});
