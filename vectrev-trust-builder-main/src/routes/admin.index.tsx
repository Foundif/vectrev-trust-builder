import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, TrendingUp, IndianRupee, Target, ArrowUpRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

type Lead = {
  id: string;
  status: string;
  source: string;
  deal_value: number | null;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6",
  contacted: "#8b5cf6",
  qualified: "#06b6d4",
  proposal: "#f59e0b",
  won: "#10b981",
  lost: "#ef4444",
};

function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("leads")
      .select("id,status,source,deal_value,created_at")
      .order("created_at", { ascending: false })
      .limit(1000)
      .then(({ data }) => {
        setLeads((data ?? []) as Lead[]);
        setLoading(false);
      });
  }, []);

  const total = leads.length;
  const won = leads.filter((l) => l.status === "won");
  const wonValue = won.reduce((s, l) => s + Number(l.deal_value ?? 0), 0);
  const pipelineValue = leads
    .filter((l) => !["won", "lost"].includes(l.status))
    .reduce((s, l) => s + Number(l.deal_value ?? 0), 0);
  const conversion = total ? Math.round((won.length / total) * 100) : 0;

  const byStatus = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.status] = (acc[l.status] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const bySource = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name: name.replace("_", " "), value }));

  // Last 30 days trend
  const days: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      count: leads.filter((l) => l.created_at.startsWith(key)).length,
    });
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Overview</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-foreground">
            Sales analytics
          </h1>
        </div>
        <Link
          to="/admin/leads"
          className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-5 py-2.5 rounded-full hover:bg-accent transition"
        >
          Open CRM <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total leads" value={total.toString()} accent />
        <StatCard icon={Target} label="Won deals" value={won.length.toString()} />
        <StatCard icon={TrendingUp} label="Conversion" value={`${conversion}%`} />
        <StatCard icon={IndianRupee} label="Pipeline value" value={`₹${pipelineValue.toLocaleString("en-IN")}`} sub={`Won: ₹${wonValue.toLocaleString("en-IN")}`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Leads — last 30 days" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={days}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="By status">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={85} paddingAngle={3}>
                  {byStatus.map((s) => (
                    <Cell key={s.name} fill={STATUS_COLORS[s.name] ?? "#94a3b8"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {byStatus.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[s.name] ?? "#94a3b8" }} />
                <span className="capitalize text-muted-foreground">{s.name}</span>
                <span className="ml-auto font-semibold text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Leads by source">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bySource}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {loading && <div className="text-center text-sm text-muted-foreground">Loading…</div>}
      {!loading && total === 0 && (
        <div className="text-center py-12 rounded-2xl border border-dashed border-border bg-card">
          <p className="text-muted-foreground">No leads yet. Submissions from the website will appear here.</p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, sub, accent,
}: {
  icon: typeof Users; label: string; value: string; sub?: string; accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 border shadow-card-premium ${accent ? "bg-dark text-dark-foreground border-white/10" : "bg-card border-border"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[11px] uppercase tracking-widest ${accent ? "text-white/60" : "text-muted-foreground"}`}>{label}</span>
        <Icon className={`h-4 w-4 ${accent ? "text-accent-brand" : "text-muted-foreground"}`} />
      </div>
      <div className="mt-3 text-3xl font-extrabold">{value}</div>
      {sub && <div className={`mt-1 text-xs ${accent ? "text-white/60" : "text-muted-foreground"}`}>{sub}</div>}
    </div>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-card border border-border p-5 shadow-card-premium ${className}`}>
      <div className="text-sm font-semibold text-foreground mb-4">{title}</div>
      {children}
    </div>
  );
}