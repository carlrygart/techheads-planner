import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ScoredSession } from "@/lib/matcher";
import { whyLine } from "@/lib/matcher";

export function SessionDialog({
  session,
  onOpenChange,
}: {
  session: ScoredSession | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={session !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        {session && (
          <>
            <DialogHeader>
              <p className="font-mono text-sm text-primary">
                {session.time}
                {session.location ? ` · ${session.location}` : ""}
              </p>
              <DialogTitle className="text-2xl leading-tight">{session.title}</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                {[session.speaker, session.company].filter(Boolean).join(" · ") ||
                  "Speaker to be announced"}
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-primary">{whyLine(session)}</p>
            {session.description && (
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/90">
                {session.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              {[session.category, ...session.keywords].filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
