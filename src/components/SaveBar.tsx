import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import type { Answers } from "@/lib/matcher";
import type { Json } from "@/integrations/supabase/types";

export function shareUrl(id: string) {
  return `${window.location.origin}/s/${id}`;
}

export async function copyShareLink(id: string) {
  const url = shareUrl(id);
  try {
    if (navigator.share && /Mobi/i.test(navigator.userAgent)) {
      await navigator.share({ title: "My TechHeads schedule", url });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
  } catch {
    toast(url);
  }
}

export function SaveBar({
  answers,
  scheduleIds,
  savedId,
  savedName,
  onSaved,
}: {
  answers: Answers;
  scheduleIds: string[];
  savedId: string | null;
  savedName: string | null;
  onSaved: (id: string, name: string) => void;
}) {
  const { user, ready } = useSession();
  const [name, setName] = useState(savedName ?? "My TechHeads day");
  const [busy, setBusy] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (savedName) setName(savedName);
  }, [savedName]);

  useEffect(() => {
    if (!savedId || !user) return;
    supabase
      .from("schedules")
      .select("is_public")
      .eq("id", savedId)
      .maybeSingle()
      .then(({ data }) => setIsPublic(Boolean(data?.is_public)));
  }, [savedId, user]);

  if (!ready) return null;

  if (!user) {
    return (
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Want to keep this schedule or share it with a colleague?
        </p>
        <Button asChild variant="outline" className="mt-3">
          <Link to="/auth" search={{ redirect: "/" }}>
            Sign in to save and share
          </Link>
        </Button>
      </div>
    );
  }

  const save = async () => {
    setBusy(true);
    const payload = {
      name: name.trim() || "My TechHeads day",
      answers: answers as unknown as Json,
      session_ids: scheduleIds,
    };
    const res = savedId
      ? await supabase.from("schedules").update(payload).eq("id", savedId).select("id").single()
      : await supabase.from("schedules").insert(payload).select("id").single();
    setBusy(false);
    if (res.error || !res.data) {
      toast.error("Could not save. Please try again.");
      return;
    }
    onSaved(res.data.id, payload.name);
    toast.success(savedId ? "Schedule updated" : "Schedule saved");
  };

  const togglePublic = async (value: boolean) => {
    if (!savedId) return;
    setIsPublic(value);
    const { error } = await supabase.from("schedules").update({ is_public: value }).eq("id", savedId);
    if (error) {
      setIsPublic(!value);
      toast.error("Could not change sharing.");
    }
  };

  return (
    <div className="mt-8 space-y-4 border-t border-border pt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          aria-label="Schedule name"
          className="h-11"
        />
        <Button onClick={save} disabled={busy} className="h-11 shrink-0">
          {busy ? "Saving..." : savedId ? "Save changes" : "Save schedule"}
        </Button>
      </div>
      {savedId && (
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-3 text-sm">
            <Switch checked={isPublic} onCheckedChange={togglePublic} />
            {isPublic ? "Public — anyone with the link can view" : "Private"}
          </label>
          {isPublic && (
            <Button variant="outline" size="sm" onClick={() => copyShareLink(savedId)}>
              Copy share link
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
