import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { MEMBER_OFF } from "@/lib/quote";

type Search = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    next: typeof raw.next === "string" ? raw.next : undefined,
  }),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const dest = next && next.startsWith("/") ? next : "/";
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("up");
  const [busy, setBusy] = useState(false);

  async function onEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const name = String(form.get("name") || "").trim();
    if (password.length < 8) {
      toast("Password needs 8 characters.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "up") {
        const { error } = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
        });
        if (error) throw new Error(error.message);
      } else {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) throw new Error(error.message);
      }
      toast(mode === "up" ? `You're in. ${MEMBER_OFF}% off is on.` : "Signed in.");
      await navigate({ to: dest });
    } catch (err) {
      toast(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">Members</p>
      <h1 className="mt-2 font-display text-5xl tracking-tight">
        Sign in. Get {MEMBER_OFF}% off.
      </h1>
      <p className="mt-3 text-sm text-muted">
        Email and a password. Same discount if you use Google or X. Guest
        checkout still works — members just pay less.
      </p>

      {!authEnabled ? (
        <p className="mt-8 text-sm text-muted">Sign-in is disabled.</p>
      ) : (
        <>
          <div className="mt-8 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("up")}
              className={`h-10 flex-1 rounded-md text-sm ${
                mode === "up" ? "bg-fg text-bg" : "border border-border text-muted"
              }`}
            >
              Create account
            </button>
            <button
              type="button"
              onClick={() => setMode("in")}
              className={`h-10 flex-1 rounded-md text-sm ${
                mode === "in" ? "bg-fg text-bg" : "border border-border text-muted"
              }`}
            >
              Sign in
            </button>
          </div>

          <form className="mt-6 flex flex-col gap-3" onSubmit={(e) => void onEmail(e)}>
            {mode === "up" ? (
              <label className="block text-xs text-muted">
                Name
                <input
                  name="name"
                  autoComplete="name"
                  className="mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
                />
              </label>
            ) : null}
            <label className="block text-xs text-muted">
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
              />
            </label>
            <label className="block text-xs text-muted">
              Password
              <input
                required
                name="password"
                type="password"
                minLength={8}
                autoComplete={mode === "up" ? "new-password" : "current-password"}
                className="mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
              />
            </label>
            <Button type="submit" size="lg" disabled={busy}>
              {busy
                ? "Working…"
                : mode === "up"
                  ? `Create account · ${MEMBER_OFF}% off`
                  : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs tracking-[0.16em] text-muted uppercase">
            Or
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                onClick={() => void signIn(p.providerId, { callbackURL: dest })}
              >
                Continue with {p.label}
              </Button>
            ))}
          </div>
        </>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        <Link to="/cart" className="text-fg underline-offset-2 hover:underline">
          Checkout as guest
        </Link>
      </p>
    </div>
  );
}
