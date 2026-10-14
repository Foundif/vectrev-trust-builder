import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, LogIn, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.webp";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign-In — VECTREV" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        setError("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <img src={logo} alt="VECTREV" className="h-10 w-10" />
          <div className="font-extrabold tracking-tight text-foreground text-lg">
            vec<span className="text-accent-brand">trev</span>
          </div>
        </Link>

        <div className="rounded-[2rem] bg-card border border-border shadow-card-premium p-8">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-3 w-3" /> Admin access
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-foreground">
            {mode === "signin" ? "Sign in" : "Create admin account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Restricted area. Sign in with your VECTREV admin credentials."
              : "First account becomes the workspace admin."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent-brand"
                placeholder="you@vectrev.in"
              />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Password</span>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className="mt-1.5 w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent-brand"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold px-6 py-3.5 rounded-full hover:bg-accent transition disabled:opacity-60"
            >
              {loading ? "Please wait…" : mode === "signin" ? <>Sign in <LogIn className="h-4 w-4" /></> : <>Create account <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <button onClick={() => setMode("signup")} className="hover:text-foreground underline underline-offset-4">
                Need an account? Create one
              </button>
            ) : (
              <button onClick={() => setMode("signin")} className="hover:text-foreground underline underline-offset-4">
                Already have an account? Sign in
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3" /> Encrypted session • Restricted to authorised staff
        </p>
      </motion.div>
    </div>
  );
}