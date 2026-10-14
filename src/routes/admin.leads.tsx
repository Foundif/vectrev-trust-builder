import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Phone, Mail, MessageCircle, X, Trash2, Save, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

const STATUSES = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_STYLE: Record<Status, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-violet-100 text-violet-700 border-violet-200",
  qualified: "bg-cyan-100 text-cyan-700 border-cyan-200",
  proposal: "bg-amber-100 text-amber-700 border-amber-200",
  won: "bg-emerald-100 text-emerald-700 border-emerald-200",
  lost: "bg-rose-100 text-rose-700 border-rose-200",
};

type Lead = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  requirement: string | null;
  source: string;
  source_detail: string | null;
  status: Status;
  deal_value: number | null;
  created_at: string;
};

type Note = { id: string; note: string; created_at: string; user_id: string | null };

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setLeads((data ?? []) as Lead[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.name, l.email, l.phone, l.company, l.requirement]
        .filter(Boolean).some((s) => s!.toLowerCase().includes(q));
    });
  }, [leads, query, statusFilter]);

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    const { error } = await supabase.from("leads").update(patch as never).eq("id", id);
    if (error) return toast.error(error.message);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    if (selected?.id === id) setSelected((s) => (s ? { ...s, ...patch } : s));
    toast.success("Lead updated");
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelected(null);
    toast.success("Lead deleted");
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Mini CRM</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-foreground">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} of {leads.length} leads</p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, email, requirement…"
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-full text-sm focus:outline-none focus:border-accent-brand"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
          className="px-4 py-2.5 bg-card border border-border rounded-full text-sm focus:outline-none focus:border-accent-brand"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Lead</th>
                <th className="text-left px-4 py-3 font-medium">Source</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Value</th>
                <th className="text-left px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">
                  <Loader2 className="inline h-4 w-4 animate-spin" /> Loading leads…
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">No leads match these filters.</td></tr>
              ) : filtered.map((l) => (
                <tr key={l.id} className="hover:bg-secondary/50 cursor-pointer" onClick={() => setSelected(l)}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-foreground">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.phone ?? l.email ?? "—"}{l.company ? ` · ${l.company}` : ""}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground capitalize">{l.source.replace("_", " ")}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${STATUS_STYLE[l.status]}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">
                    {l.deal_value ? `₹${Number(l.deal_value).toLocaleString("en-IN")}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(l.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-accent-brand font-medium">Open →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={(patch) => updateLead(selected.id, patch)}
          onDelete={() => deleteLead(selected.id)}
        />
      )}
    </div>
  );
}

function LeadDrawer({
  lead, onClose, onUpdate, onDelete,
}: {
  lead: Lead; onClose: () => void;
  onUpdate: (patch: Partial<Lead>) => void;
  onDelete: () => void;
}) {
  const [status, setStatus] = useState<Status>(lead.status);
  const [value, setValue] = useState<string>(lead.deal_value ? String(lead.deal_value) : "");
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    setStatus(lead.status);
    setValue(lead.deal_value ? String(lead.deal_value) : "");
    supabase
      .from("lead_notes")
      .select("*")
      .eq("lead_id", lead.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setNotes((data ?? []) as Note[]));
  }, [lead.id, lead.status, lead.deal_value]);

  const save = () => onUpdate({ status, deal_value: value ? Number(value) : 0 });

  const addNote = async () => {
    const text = newNote.trim();
    if (!text) return;
    setSavingNote(true);
    const { data: u } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("lead_notes")
      .insert({ lead_id: lead.id, note: text, user_id: u.user?.id ?? null })
      .select()
      .single();
    setSavingNote(false);
    if (error) return toast.error(error.message);
    setNotes((prev) => [data as Note, ...prev]);
    setNewNote("");
    toast.success("Note added");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-xl h-full bg-background border-l border-border overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-background border-b border-border">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Lead</div>
            <h2 className="text-xl font-extrabold text-foreground truncate">{lead.name}</h2>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-secondary hover:bg-border flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-2">
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-accent-brand transition text-sm font-medium">
                <Phone className="h-4 w-4 text-accent-brand" /> Call
              </a>
            )}
            {lead.phone && (
              <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-accent-brand transition text-sm font-medium">
                <MessageCircle className="h-4 w-4 text-accent-brand" /> WhatsApp
              </a>
            )}
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="col-span-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-accent-brand transition text-sm font-medium">
                <Mail className="h-4 w-4 text-accent-brand" /> {lead.email}
              </a>
            )}
          </div>

          <Field label="Phone">{lead.phone ?? "—"}</Field>
          <Field label="Company">{lead.company ?? "—"}</Field>
          <Field label="Source">
            <span className="capitalize">{lead.source.replace("_", " ")}</span>
            {lead.source_detail ? <span className="text-muted-foreground"> · {lead.source_detail}</span> : null}
          </Field>
          <Field label="Requirement">
            <div className="whitespace-pre-wrap text-foreground/85">{lead.requirement ?? "—"}</div>
          </Field>
          <Field label="Received">
            {new Date(lead.created_at).toLocaleString("en-IN")}
          </Field>

          <div className="rounded-2xl bg-card border border-border p-5 space-y-4">
            <div className="text-sm font-semibold">Pipeline</div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="mt-1.5 w-full bg-background border border-border rounded-xl px-3 py-2 text-sm capitalize"
                >
                  {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Deal value (₹)</span>
                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1.5 w-full bg-background border border-border rounded-xl px-3 py-2 text-sm"
                />
              </label>
            </div>
            <button onClick={save} className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-accent transition">
              <Save className="h-4 w-4" /> Save changes
            </button>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5 space-y-3">
            <div className="text-sm font-semibold">Notes & follow-ups</div>
            <div className="flex gap-2">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a follow-up note…"
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent-brand"
                onKeyDown={(e) => { if (e.key === "Enter") addNote(); }}
              />
              <button onClick={addNote} disabled={savingNote} className="inline-flex items-center gap-1 px-3 py-2 bg-foreground text-background rounded-xl text-sm font-medium disabled:opacity-60">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {notes.length === 0 && <div className="text-xs text-muted-foreground">No notes yet.</div>}
              {notes.map((n) => (
                <div key={n.id} className="rounded-xl bg-secondary p-3">
                  <div className="text-sm text-foreground whitespace-pre-wrap">{n.note}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {new Date(n.created_at).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onDelete}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 transition"
          >
            <Trash2 className="h-4 w-4" /> Delete lead
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground">{children}</div>
    </div>
  );
}