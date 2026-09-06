import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Loader2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.webp";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — VECTREV" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

type AuthState =
  | { kind: "loading" }
  | { kind: "unauthenticated" }
  | { kind: "forbidden"; email: string }
  | { kind: "ready"; email: string; role: "admin" | "staff" };

function AdminLayout() {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (cancelled) return;
      const user = userData.user;
      if (!user) {
        setState({ kind: "unauthenticated" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      if (cancelled) return;
      const role =
        roles?.find((r) => r.role === "admin")?.role ??
        roles?.find((r) => r.role === "staff")?.role;
      if (!role) {
        setState({ kind: "forbidden", email: user.email ?? "" });
        return;
      }
      setState({ kind: "ready", email: user.email ?? "", role: role as "admin" | "staff" });
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (state.kind === "unauthenticated") navigate({ to: "/login" });
  }, [state.kind, navigate]);

  if (state.kind === "loading" || state.kind === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (state.kind === "forbidden") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center rounded-[2rem] bg-card border border-border p-8 shadow-card-premium">
          <div className="mx-auto h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-foreground">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{state.email}</span> is not authorised
            for the VECTREV admin panel. Ask an existing admin to grant you the
            <span className="font-semibold"> staff</span> or <span className="font-semibold">admin</span> role.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/login" });
            }}
            className="mt-6 inline-flex items-center gap-2 bg-foreground text-background font-semibold px-5 py-2.5 rounded-full"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-secondary/50">
      <AdminSidebar email={state.email} role={state.role} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Outlet />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads & CRM", icon: Users, exact: false },
] as const;

function AdminSidebar({ email, role }: { email: string; role: "admin" | "staff" }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-64 flex-col bg-dark text-dark-foreground border-r border-white/10 sticky top-0 h-screen">
      <Link to="/" className="flex items-center gap-2.5 px-6 py-6 border-b border-white/10">
        <img src={logo} alt="VECTREV" className="h-9 w-9" />
        <div>
          <div className="font-extrabold tracking-tight text-base">
            vec<span className="text-accent-brand">trev</span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.22em] text-white/50">Admin Panel</div>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((n) => {
          const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-xs text-white/60 hover:bg-white/5 hover:text-white transition"
        >
          <span>View live site</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
        <div className="px-4 py-3 rounded-xl bg-white/5">
          <div className="text-[10px] uppercase tracking-widest text-white/50">Signed in</div>
          <div className="mt-1 text-sm font-medium truncate">{email}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-widest text-accent-brand">
            {role}
          </div>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/login" });
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 transition"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </aside>
  );
}