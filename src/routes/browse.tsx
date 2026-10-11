import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import {
  filterEntries,
  sortEntries,
  toBrowseEntry,
  type BrowseEntry,
  type BrowseSort,
} from "@/lib/browse";
import { loadSaved } from "@/lib/persist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse schedules — TechHeadsPlanner" },
      {
        name: "description",
        content: "See how other people are planning their TechHeads 2026 day.",
      },
      { property: "og:title", content: "Browse schedules — TechHeadsPlanner" },
      {
        property: "og:description",
        content: "See how other people are planning their TechHeads 2026 day.",
      },
    ],
  }),
  component: BrowsePage,
});

// The RPC caps results at 100 server-side.
const PAGE_LIMIT = 100;

const SORTS: { value: BrowseSort; label: string }[] = [
  { value: "recent", label: "Recent" },
  { value: "in-common", label: "Most in common" },
];

const chipClass = (active: boolean) =>
  cn(
    "rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
  );

function BrowsePage() {
  const [viewerIds, setViewerIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  // null = not chosen by the user yet; falls back to a default based on the viewer's plan
  const [sortChoice, setSortChoice] = useState<BrowseSort | null>(null);

  // localStorage is client-only, so read the viewer's plan after mount
  useEffect(() => {
    setViewerIds(loadSaved()?.scheduleIds ?? []);
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["public-schedules"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("list_public_schedules", { _limit: PAGE_LIMIT });
      if (error) throw error;
      return data;
    },
  });

  const hasPlan = viewerIds.length > 0;
  const sort: BrowseSort = sortChoice ?? (hasPlan ? "in-common" : "recent");

  const entries = useMemo(
    () => (data ?? []).map((row) => toBrowseEntry(row, viewerIds)),
    [data, viewerIds],
  );
  const categories = useMemo(
    () =>
      Array.from(new Set(entries.flatMap((e) => e.categories))).sort((a, b) => a.localeCompare(b)),
    [entries],
  );
  const visible = useMemo(
    () => sortEntries(filterEntries(entries, { query, category }), sort),
    [entries, query, category, sort],
  );

  const clearFilters = () => {
    setQuery("");
    setCategory(null);
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-10 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Browse</p>
      <h1 className="mt-3 text-4xl font-bold">Other people's schedules</h1>
      <p className="mt-3 text-muted-foreground">
        See how others are planning their TechHeads day.
        {hasPlan ? " Schedules are compared with the plan saved in this browser." : ""}
      </p>

      {isLoading && (
        <div className="mt-10 space-y-6" aria-busy="true" aria-label="Loading schedules">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {error && !data && (
        <div className="mt-10" role="alert">
          <p className="text-muted-foreground">Something went wrong while loading schedules.</p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {data && entries.length === 0 && (
        <div className="mt-10">
          <p className="text-muted-foreground">
            No one has listed a schedule yet. Owners can make a schedule public and list it in
            Browse from My schedules.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/">Build a schedule</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/schedules">My schedules</Link>
            </Button>
          </div>
        </div>
      )}

      {entries.length > 0 && (
        <>
          <div className="mt-10 space-y-4">
            <div>
              <label htmlFor="browse-search" className="sr-only">
                Search people, sessions, speakers
              </label>
              <Input
                id="browse-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people, sessions, speakers"
              />
            </div>

            {categories.length > 0 && (
              <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={category === null}
                  onClick={() => setCategory(null)}
                  className={chipClass(category === null)}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={category === c}
                    onClick={() => setCategory(category === c ? null : c)}
                    className={chipClass(category === c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div>
                <p className="text-muted-foreground" aria-live="polite">
                  {visible.length} of {entries.length} schedules
                </p>
                {data?.length === PAGE_LIMIT && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Showing the {PAGE_LIMIT} most recently updated schedules.
                  </p>
                )}
              </div>
              <div role="group" aria-label="Sort schedules" className="flex items-center gap-2">
                <span className="text-muted-foreground" aria-hidden="true">
                  Sort:
                </span>
                {SORTS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    aria-pressed={sort === s.value}
                    onClick={() => setSortChoice(s.value)}
                    className={chipClass(sort === s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="mt-10">
              <p className="text-muted-foreground">No schedules match your search.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {visible.map((entry) => (
                <li key={entry.id}>
                  <EntryRow entry={entry} showInCommon={hasPlan} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

function EntryRow({ entry, showInCommon }: { entry: BrowseEntry; showInCommon: boolean }) {
  const preview = entry.sessions.slice(0, 3);
  const more = entry.sessions.length - preview.length;

  return (
    <Link
      to="/s/$id"
      params={{ id: entry.id }}
      className="group block rounded-sm py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{entry.owner}</p>
      <p className="mt-1 text-xl font-semibold group-hover:text-primary">{entry.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {entry.sessions.length} {entry.sessions.length === 1 ? "session" : "sessions"}
        {showInCommon && (
          <>
            {" · "}
            <span className={entry.inCommon > 0 ? "text-primary" : undefined}>
              {entry.inCommon} in common with your plan
            </span>
          </>
        )}
        {" · "}updated {new Date(entry.updatedAt).toLocaleDateString("en-GB")}
      </p>
      {entry.categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.categories.slice(0, 3).map((c) => (
            <span key={c} className={badgeVariants({ variant: "secondary" })}>
              {c}
            </span>
          ))}
        </div>
      )}
      {preview.length > 0 && (
        <ul className="mt-3 space-y-0.5 text-sm text-muted-foreground">
          {preview.map((s) => (
            <li key={s.id} className="truncate">
              {s.title}
            </li>
          ))}
          {more > 0 && <li>+{more} more</li>}
        </ul>
      )}
    </Link>
  );
}
