import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SessionDialog } from "@/components/SessionDialog";
import { SwapSheet } from "@/components/SwapSheet";
import { SaveBar } from "@/components/SaveBar";
import {
  allCategories,
  alternativesFor,
  buildSchedule,
  matchPercent,
  scoreSessions,
  topKeywords,
  totalSessions,
  whyLine,
  type Answers,
  type Density,
  type ScoredSession,
} from "@/lib/matcher";
import { clearSaved, loadSaved, saveState } from "@/lib/persist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechHeadsPlanner — Your personal TechHeads 2026 schedule" },
      {
        name: "description",
        content:
          "Answer three quick questions and get a personal timeline for TechHeads 2026, built from the full conference programme.",
      },
      { property: "og:title", content: "TechHeadsPlanner — Your personal TechHeads 2026 schedule" },
      {
        property: "og:description",
        content:
          "Answer three quick questions and get a personal timeline for TechHeads 2026, built from the full conference programme.",
      },
    ],
  }),
  component: Index,
});

type Step = "landing" | "categories" | "keywords" | "density" | "result";

const DENSITIES: { value: Density; label: string; blurb: string }[] = [
  { value: "packed", label: "Packed", blurb: "Back-to-back sessions, as much as the day allows." },
  { value: "balanced", label: "Balanced", blurb: "Around eight sessions with small breathers." },
  { value: "spacious", label: "Spacious", blurb: "Fewer sessions, at least 20 minutes between." },
];

const formatGap = (min: number) => (min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min break`.replace(" 0 min", "") : `${min} min break`);

function Index() {
  const keywordOptions = useMemo(() => topKeywords(12), []);
  const [step, setStep] = useState<Step>("landing");
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [density, setDensity] = useState<Density>("balanced");
  const [scheduleIds, setScheduleIds] = useState<string[]>([]);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [open, setOpen] = useState<ScoredSession | null>(null);
  const [swapTarget, setSwapTarget] = useState<ScoredSession | null>(null);

  const answers: Answers = useMemo(
    () => ({ categories, keywords, density, companies: [] }),
    [categories, keywords, density],
  );

  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setCategories(saved.answers.categories ?? []);
      setKeywords(saved.answers.keywords ?? []);
      setDensity(saved.answers.density);
      setScheduleIds(saved.scheduleIds);
      setSavedId(saved.savedId ?? null);
      setSavedName(saved.savedName ?? null);
      setStep("result");
    }
  }, []);

  const scored = useMemo(() => scoreSessions(answers), [answers]);
  const schedule = useMemo(
    () =>
      scheduleIds
        .map((id) => scored.find((s) => s.id === id))
        .filter((s): s is ScoredSession => Boolean(s))
        .sort((a, b) => a.startMin - b.startMin),
    [scheduleIds, scored],
  );

  const generate = () => {
    const built = buildSchedule(answers);
    setScheduleIds(built.map((s) => s.id));
    setStep("result");
    saveState({ answers, scheduleIds: built.map((s) => s.id), savedId, savedName });
  };

  const restart = () => {
    clearSaved();
    setCategories([]);
    setKeywords([]);
    setDensity("balanced");
    setScheduleIds([]);
    setSavedId(null);
    setSavedName(null);
    setStep("landing");
  };

  const applySwap = (alt: ScoredSession) => {
    if (!swapTarget) return;
    const next = scheduleIds.map((id) => (id === swapTarget.id ? alt.id : id));
    setScheduleIds(next);
    saveState({ answers, scheduleIds: next, savedId, savedName });
    setSwapTarget(null);
  };

  const onSaved = (id: string, name: string) => {
    setSavedId(id);
    setSavedName(name);
    saveState({ answers, scheduleIds, savedId: id, savedName: name });
  };

  const toggle = (list: string[], value: string, set: (v: string[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-24 pt-10 sm:px-8">
      {step === "landing" && (
        <section className="flex min-h-[80vh] flex-col justify-center">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
            TechHeads 2026
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl">
            One day.
            <br />
            {totalSessions} sessions.
            <br />
            <span className="text-primary">Your schedule.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Answer three short questions and get a personal timeline for the day, picked from the
            full conference programme — with the reason behind every choice.
          </p>
          <Button size="lg" className="mt-10 h-14 text-base" onClick={() => setStep("categories")}>
            Build my schedule
          </Button>
        </section>
      )}

      {step === "categories" && (
        <QuestionShell
          index={1}
          title="Which areas interest you?"
          hint="Pick as many as you like."
          onBack={() => setStep("landing")}
          onNext={() => setStep("keywords")}
          nextDisabled={categories.length === 0}
        >
          {allCategories.map((cat) => (
            <SelectCard
              key={cat}
              label={cat}
              selected={categories.includes(cat)}
              onClick={() => toggle(categories, cat, setCategories)}
            />
          ))}
        </QuestionShell>
      )}

      {step === "keywords" && (
        <QuestionShell
          index={2}
          title="What do you want out of the day?"
          hint="The most common themes across the programme."
          onBack={() => setStep("categories")}
          onNext={() => setStep("density")}
          nextDisabled={false}
        >
          {keywordOptions.map((kw) => (
            <SelectCard
              key={kw}
              label={kw}
              selected={keywords.includes(kw)}
              onClick={() => toggle(keywords, kw, setKeywords)}
            />
          ))}
        </QuestionShell>
      )}

      {step === "density" && (
        <QuestionShell
          index={3}
          title="How do you want your day?"
          hint="This controls how many sessions we pick."
          onBack={() => setStep("keywords")}
          onNext={generate}
          nextLabel="Show my schedule"
          nextDisabled={false}
        >
          {DENSITIES.map((d) => (
            <SelectCard
              key={d.value}
              label={d.label}
              sub={d.blurb}
              selected={density === d.value}
              onClick={() => setDensity(d.value)}
            />
          ))}
        </QuestionShell>
      )}

      {step === "result" && (
        <Result
          schedule={schedule}
          answers={answers}
          onOpen={setOpen}
          onSwap={setSwapTarget}
          onRestart={restart}
          onEdit={() => setStep("categories")}
        />
      )}
      {step === "result" && schedule.length > 0 && (
        <SaveBar
          answers={answers}
          scheduleIds={scheduleIds}
          savedId={savedId}
          savedName={savedName}
          onSaved={onSaved}
        />
      )}

      <SessionDialog session={open} onOpenChange={(o) => !o && setOpen(null)} />
      <SwapSheet
        target={swapTarget}
        options={swapTarget ? alternativesFor(swapTarget, schedule, answers) : []}
        onPick={applySwap}
        onOpenChange={(o) => !o && setSwapTarget(null)}
      />
    </main>
  );
}

function QuestionShell({
  index,
  title,
  hint,
  children,
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continue",
}: {
  index: number;
  title: string;
  hint: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  nextLabel?: string;
}) {
  return (
    <section>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back
      </button>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        Step {index} of 3
      </p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-muted-foreground">{hint}</p>
      <div className="mt-8 space-y-3">{children}</div>
      <div className="sticky bottom-0 mt-10 bg-background py-4">
        <Button size="lg" className="h-14 w-full text-base" disabled={nextDisabled} onClick={onNext}>
          {nextLabel}
        </Button>
      </div>
    </section>
  );
}

function SelectCard({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`choice-card flex items-center justify-between gap-4 ${selected ? "choice-card-selected" : ""}`}
    >
      <span>
        <span className="block text-lg font-semibold">{label}</span>
        {sub && <span className="mt-1 block text-sm text-muted-foreground">{sub}</span>}
      </span>
      {selected && <Check className="size-5 shrink-0 text-primary" />}
    </button>
  );
}

function Result({
  schedule,
  answers,
  onOpen,
  onSwap,
  onRestart,
  onEdit,
}: {
  schedule: ScoredSession[];
  answers: Answers;
  onOpen: (s: ScoredSession) => void;
  onSwap: (s: ScoredSession) => void;
  onRestart: () => void;
  onEdit: () => void;
}) {
  const percent = matchPercent(schedule, answers);

  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Your day</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
        {schedule.length} of {totalSessions} sessions
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        {percent} % match against your interests
      </p>
      <div className="mt-4 flex gap-3">
        <Button variant="outline" onClick={onEdit}>
          Change answers
        </Button>
        <Button variant="ghost" onClick={onRestart}>
          Start over
        </Button>
      </div>

      <ol className="mt-10 border-l border-border">
        {schedule.map((s, i) => {
          const prev = schedule[i - 1];
          const gap = prev ? s.startMin - prev.endMin : 0;
          return (
            <li key={s.id}>
              {prev && gap > 0 && (
                <p className="py-4 pl-6 text-xs uppercase tracking-widest text-muted-foreground">
                  {formatGap(gap)}
                </p>
              )}
              <div className="relative pb-8 pl-6">
                <span className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-primary" />
                <p className="font-mono text-sm text-primary">
                  {s.time}
                  {s.location ? ` · ${s.location}` : ""}
                </p>
                <button
                  onClick={() => onOpen(s)}
                  className="mt-2 block text-left text-xl font-semibold leading-snug hover:text-primary"
                >
                  {s.title}
                </button>
                {(s.speaker || s.company) && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[s.speaker, s.company].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="mt-3 text-sm text-primary">{whyLine(s)}</p>
                <div className="mt-3 flex gap-4 text-sm">
                  <button
                    onClick={() => onOpen(s)}
                    className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onSwap(s)}
                    className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Swap
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {schedule.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          Nothing matched your answers. Try picking a few more areas or themes.
        </p>
      )}
    </section>
  );
}
