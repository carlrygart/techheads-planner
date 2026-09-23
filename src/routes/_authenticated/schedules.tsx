import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { copyShareLink } from "@/components/SaveBar";
import { supabase } from "@/integrations/supabase/client";
import { saveState } from "@/lib/persist";
import type { Answers } from "@/lib/matcher";

export const Route = createFileRoute("/_authenticated/schedules")({
  head: () => ({
    meta: [
      { title: "My schedules — TechHeadsMatcher" },
      { name: "description", content: "Your saved TechHeads schedules." },
      { property: "og:title", content: "My schedules — TechHeadsMatcher" },
      { property: "og:description", content: "Your saved TechHeads schedules." },
    ],
  }),
  component: SchedulesPage,
});

function SchedulesPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["my-schedules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select("id, name, answers, session_ids, is_public, updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const refresh = () => qc.invalidateQueries({ queryKey: ["my-schedules"] });

  const setPublic = async (id: string, value: boolean) => {
    const { error } = await supabase.from("schedules").update({ is_public: value }).eq("id", id);
    if (error) toast.error("Could not change sharing.");
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this schedule?")) return;
    const { error } = await supabase.from("schedules").delete().eq("id", id);
    if (error) toast.error("Could not delete.");
    refresh();
  };

  const open = (s: NonNullable<typeof data>[number]) => {
    saveState({ answers: s.answers as unknown as Answers, scheduleIds: s.session_ids, savedId: s.id, savedName: s.name });
    navigate({ to: "/" });
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-10 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Saved</p>
      <h1 className="mt-3 text-4xl font-bold">My schedules</h1>

      {isLoading && <p className="mt-10 text-muted-foreground">Loading...</p>}
      {data && data.length === 0 && (
        <div className="mt-10">
          <p className="text-muted-foreground">You have not saved any schedules yet.</p>
          <Button asChild className="mt-4"><Link to="/">Build a schedule</Link></Button>
        </div>
      )}

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {data?.map((s) => (
          <li key={s.id} className="py-6">
            <button onClick={() => open(s)} className="text-left text-xl font-semibold hover:text-primary">
              {s.name}
            </button>
            <p className="mt-1 text-sm text-muted-foreground">
              {s.session_ids.length} sessions · updated {new Date(s.updated_at).toLocaleDateString("en-GB")}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <Switch checked={s.is_public} onCheckedChange={(v) => setPublic(s.id, v)} />
                {s.is_public ? "Public" : "Private"}
              </label>
              {s.is_public && (
                <button onClick={() => copyShareLink(s.id)} className="text-primary underline underline-offset-4">Copy link</button>
              )}
              <button onClick={() => open(s)} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">Open</button>
              <button onClick={() => remove(s.id)} className="text-muted-foreground underline underline-offset-4 hover:text-destructive">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
