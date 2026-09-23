// Pure CSV -> Session parser. Runs at build time from the Vite plugin in
// vite.config.ts, so it must not import anything from the app.

export type Session = {
  id: string;
  title: string;
  speaker: string;
  description: string;
  time: string;
  location: string;
  company: string;
  category: string;
  keywords: string[];
};

export const OTHER_CATEGORY = "Other";

const COLUMNS = [
  "description",
  "title",
  "speaker",
  "time",
  "location",
  "company",
  "category",
  "keywords",
] as const;

/** RFC 4180 parser: quoted fields, escaped quotes, newlines inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((f) => f.trim() !== ""));
}

const slug = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

/**
 * Turns the programme CSV into sessions. IDs are derived from start time +
 * title so that saved schedules in the database survive row reordering.
 */
export function parseProgram(text: string): Session[] {
  const [header, ...rows] = parseCsv(text);
  if (!header) throw new Error("Programme CSV is empty");
  const index = header.map((h) => h.trim().toLowerCase());
  const missing = COLUMNS.filter((c) => !index.includes(c));
  if (missing.length) throw new Error(`Programme CSV is missing columns: ${missing.join(", ")}`);

  const seen = new Map<string, number>();
  return rows.map((cells) => {
    const get = (col: (typeof COLUMNS)[number]) => (cells[index.indexOf(col)] ?? "").trim();
    const time = get("time").replace(/\s+/g, "");
    const title = get("title");
    const base = `${time.split("-")[0]?.replace(":", "") ?? ""}-${slug(title)}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);

    return {
      id: n === 1 ? base : `${base}-${n}`,
      title,
      speaker: get("speaker"),
      description: get("description"),
      time,
      location: get("location"),
      company: get("company"),
      category: get("category") || OTHER_CATEGORY,
      keywords: get("keywords")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };
  });
}
