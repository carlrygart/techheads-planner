import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

const safePath = (p?: string) => (p && p.startsWith("/") && !p.startsWith("//") ? p : "/schedules");

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Sign in — TechHeadsMatcher" },
      { name: "description", content: "Sign in to save your TechHeads schedules and share them with a link." },
      { property: "og:title", content: "Sign in — TechHeadsMatcher" },
      { property: "og:description", content: "Save your TechHeads schedules and share them with a link." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, ready } = useSession();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: safePath(redirect), replace: true });
  }, [ready, user, redirect, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + safePath(redirect),
          data: { display_name: displayName.trim() },
        },
      });
      if (error) setError(error.message);
      else if (!data.session) setCheckEmail(true);
    }
    setBusy(false);
  };

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col justify-center px-5 py-10">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">TechHeadsMatcher</p>
      <h1 className="mt-4 text-4xl font-bold">{mode === "signin" ? "Sign in" : "Create account"}</h1>
      <p className="mt-3 text-muted-foreground">Save several schedules and share any of them with a link.</p>

      {checkEmail ? (
        <p className="mt-8 border-l-2 border-primary pl-4 text-lg">
          Check your inbox at <strong>{email}</strong> and click the confirmation link to finish signing up.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-5">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="dn">Display name</Label>
              <Input id="dn" required maxLength={60} value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="h-12" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input id="pw" type="password" required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="h-12" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={busy} className="h-12 w-full text-base">
            {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }}
            className="w-full text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {mode === "signin" ? "No account yet? Create one" : "Already have an account? Sign in"}
          </button>
        </form>
      )}
      <Link to="/" className="mt-10 text-sm text-muted-foreground hover:text-foreground">Back to the schedule builder</Link>
    </main>
  );
}
