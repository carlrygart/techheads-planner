import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { ScoredSession } from "@/lib/matcher";
import { whyLine } from "@/lib/matcher";

export function SwapSheet({
  target,
  options,
  onPick,
  onOpenChange,
}: {
  target: ScoredSession | null;
  options: ScoredSession[];
  onPick: (alt: ScoredSession) => void;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={target !== null} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-xl">Swap this slot</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Alternatives that still fit around the rest of your day.
          </p>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          {options.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No alternative fits without clashing with your other sessions.
            </p>
          )}
          {options.map((alt) => (
            <button key={alt.id} className="choice-card" onClick={() => onPick(alt)}>
              <p className="font-mono text-xs text-primary">
                {alt.time}
                {alt.location ? ` · ${alt.location}` : ""}
              </p>
              <p className="mt-1 text-base font-semibold leading-snug">{alt.title}</p>
              {alt.speaker && (
                <p className="text-sm text-muted-foreground">{alt.speaker}</p>
              )}
              <p className="mt-2 text-xs text-primary">{whyLine(alt)}</p>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
