import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, CalendarCheck, ArrowLeft, Loader2 } from "lucide-react";
import logo from "@/assets/logo.webp";
import { captureLead } from "@/lib/leadCapture";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does T&C involve?",
  "Do you test protection relays?",
  "Can you do an ETAP study?",
  "Book a site visit",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi 👋 I'm Vee, VECTREV's engineering assistant. Ask me about testing & commissioning, relay configuration, ETAP studies or safety compliance — or book an appointment with our team.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "book">("chat");
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open, view]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    if (/book|appointment|site visit|meeting/i.test(clean) && clean.length < 22) {
      setView("book");
      return;
    }
    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Something went wrong. Please call +91 63796 08428 or email info@vectrev.in.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network issue — please retry, or call +91 63796 08428." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with VECTREV"}
        className="fixed bottom-5 left-5 z-[60] h-14 w-14 rounded-full bg-foreground text-background shadow-card-premium flex items-center justify-center hover:bg-accent transition"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed z-[60] bg-card border border-border rounded-3xl shadow-card-premium overflow-hidden flex flex-col
                       inset-x-3 bottom-24 top-20 sm:inset-x-auto sm:top-auto sm:left-5 sm:bottom-24 sm:w-[380px] sm:h-[560px]"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-dark text-dark-foreground">
              {view === "book" && (
                <button onClick={() => setView("chat")} aria-label="Back to chat" className="p-1 -ml-1">
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <img src={logo} alt="" className="h-9 w-9" />
              <div className="leading-tight min-w-0">
                <div className="text-sm font-bold">VECTREV Assistant</div>
                <div className="text-[11px] text-white/60 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online · replies instantly
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="ml-auto p-1">
                <X className="h-4 w-4" />
              </button>
            </div>

            {view === "chat" ? (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-secondary/30">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "ml-auto bg-foreground text-background rounded-2xl rounded-br-sm px-3.5 py-2.5"
                          : "text-foreground"
                      }`}
                    >
                      {m.content}
                    </div>
                  ))}
                  {loading && (
                    <div className="text-sm text-muted-foreground inline-flex items-center gap-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                    </div>
                  )}
                  {messages.length === 1 && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => (s === "Book a site visit" ? setView("book") : send(s))}
                          className="text-xs border border-border bg-card rounded-full px-3 py-1.5 hover:border-accent transition"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="border-t border-border p-3 flex items-center gap-2 bg-card"
                >
                  <button
                    type="button"
                    onClick={() => setView("book")}
                    aria-label="Book appointment"
                    className="h-10 w-10 shrink-0 rounded-full bg-accent/10 text-accent-brand flex items-center justify-center hover:bg-accent/20 transition"
                  >
                    <CalendarCheck className="h-4 w-4" />
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about testing, relays, ETAP…"
                    className="flex-1 min-w-0 bg-secondary rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/40"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="h-10 w-10 shrink-0 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-40 hover:bg-accent transition"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              <BookingForm
                onDone={(name) => {
                  setView("chat");
                  setMessages((m) => [
                    ...m,
                    {
                      role: "assistant",
                      content: `Thanks ${name}! Your appointment request is with our team — we'll confirm on your phone within one working day. Need it urgently? Call +91 63796 08428.`,
                    },
                  ]);
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BookingForm({ onDone }: { onDone: (name: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get("name") || "").trim();
        const phone = String(fd.get("phone") || "").trim();
        if (!name || !phone) {
          setErr("Name and phone are required.");
          return;
        }
        setBusy(true);
        await captureLead({
          name,
          phone,
          email: String(fd.get("email") || "").trim() || undefined,
          company: String(fd.get("company") || "").trim() || undefined,
          requirement: `Appointment request — ${String(fd.get("date") || "no date given")} · ${String(
            fd.get("scope") || "",
          )}`,
          source: "other",
          source_detail: "ai_chat_appointment",
        });
        setBusy(false);
        onDone(name.split(" ")[0] ?? name);
      }}
      className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30"
    >
      <div>
        <div className="text-sm font-bold text-foreground">Book an appointment</div>
        <p className="text-xs text-muted-foreground mt-1">
          Share a few details — our engineering desk confirms within one working day.
        </p>
      </div>
      {[
        { name: "name", label: "Name*", type: "text" },
        { name: "phone", label: "Phone*", type: "tel" },
        { name: "email", label: "Email", type: "email" },
        { name: "company", label: "Company / site", type: "text" },
        { name: "date", label: "Preferred date", type: "date" },
      ].map((f) => (
        <label key={f.name} className="block">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{f.label}</span>
          <input
            name={f.name}
            type={f.type}
            className="mt-1 w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>
      ))}
      <label className="block">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Scope / voltage level</span>
        <textarea
          name="scope"
          rows={3}
          placeholder="e.g. 33/11 kV substation pre-commissioning, relay coordination"
          className="mt-1 w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/40"
        />
      </label>
      {err && <p className="text-xs text-destructive">{err}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold text-sm px-5 py-3 rounded-full hover:bg-accent transition disabled:opacity-60"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
        Request appointment
      </button>
    </form>
  );
}
