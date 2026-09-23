import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { SessionDialog } from "@/components/SessionDialog";
import { supabase } from "@/integrations/supabase/client";
import { matchPercent, scoreSessions, totalSessions, whyLine, type Answers, type ScoredSession } from "@/lib/matcher";

export const Route = createFileRoute("/s/$id")({
  head: () => ({
    meta: [
      { title: "A shared TechHeads schedule — TechHeadsPlanner" },
      { name: "description", content: "See this personal TechHeads 2026 schedule, then build your own in three questions." },
      { property: "og:title", content: "A shared TechHeads schedule" },
      { property: "og:description", content: "See this personal TechHeads 2026 schedule, then build your own in three questions." },
    ],
  }),
  component: SharedPage,
});

const formatGap = (min: number) => (min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min break`.replace(" 0 min", "") : `${min} min break`);

function SharedPage() {
  const { id } = Route.useParams();
  const [open, setOpen] = useState<ScoredSession | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["shared", id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_schedule", { _id: id });
      if (error) return null;
      return data?.[0] ?? null;
    },
  });

  const answers = data?.answers as unknown as Answers | undefined;
  const schedule = useMemo(() => {
    if (!data || !answers) return [];
    const scored = scoreSessions(answers);
    return data.session_ids
      .map((sid) => scored.find((s) => s.id === sid))
      .filter((s): s is ScoredSession => Boolean(s))
      .sort((a, b) => a.startMin - b.startMin);
  }, [data, answers]);

  if (isLoading) return <main className="mx-auto max-w-2xl px-5 pt-16 text-muted-foreground">Loading...</main>;

  if (!data || !answers) {
    return (
      <main className="mx-auto max-w-2xl px-5 pt-16">
        <h1 className="text-3xl font-bold">This schedule is not available</h1>
        <p className="mt-3 text-muted-foreground">It may have been made private or deleted.</p>
        <Button asChild className="mt-6"><Link to="/">Build your own schedule</Link></Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-10 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {data.display_name ? `${data.display_name}'s TechHeads day` : "A shared TechHeads day"}
      </p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{data.name}</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        {schedule.length} of {totalSessions} sessions · {matchPercent(schedule, answers)} % match
      </p>
      <Button asChild className="mt-5"><Link to="/">Build your own</Link></Button>

      <ol className="mt-10 border-l border-border">
        {schedule.map((s, i) => {
          const prev = schedule[i - 1];
          const gap = prev ? s.startMin - prev.endMin : 0;
          return (
            <li key={s.id}>
              {prev && gap > 0 && (
                <p className="py-4 pl-6 text-xs uppercase tracking-widest text-muted-foreground">{formatGap(gap)}</p>
              )}
              <div className="relative pb-8 pl-6">
                <span className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-primary" />
                <p className="font-mono text-sm text-primary">{s.time}{s.location ? ` · ${s.location}` : ""}</p>
                <button onClick={() => setOpen(s)} className="mt-2 block text-left text-xl font-semibold leading-snug hover:text-primary">
                  {s.title}
                </button>
                {(s.speaker || s.company) && (
                  <p className="mt-1 text-sm text-muted-foreground">{[s.speaker, s.company].filter(Boolean).join(" · ")}</p>
                )}
                <p className="mt-3 text-sm text-primary">{whyLine(s)}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <SessionDialog session={open} onOpenChange={(o) => !o && setOpen(null)} />
    </main>
  );
}
