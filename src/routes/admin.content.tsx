import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  Save, 
  RotateCcw, 
  Bot, 
  FileText, 
  Image as ImageIcon, 
  Phone, 
  Sparkles, 
  Check, 
  AlertCircle,
  Loader2 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { contentDefaults } from "@/data/siteContent";

export const Route = createFileRoute("/admin/content")({
  head: () => ({
    meta: [
      { title: "Site Content CMS — VECTREV Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminContentPage,
});

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "home" | "about" | "contact">("general");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("site_content").select("key, value");
      if (error) throw error;

      const merged: Record<string, string> = {};
      Object.entries(contentDefaults).forEach(([key, item]) => {
        merged[key] = item.value ?? item.image ?? "";
      });

      data?.forEach((row) => {
        if (row.value) merged[row.key] = row.value;
      });

      setContent(merged);
    } catch (err) {
      toast.error("Failed to load content from database");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (key: string, value: string) => {
    setSavingKey(key);
    setContent((prev) => ({ ...prev, [key]: value }));

    try {
      const { data: authData } = await supabase.auth.getUser();
      const { error } = await supabase.from("site_content").upsert({
        key,
        value,
        updated_at: new Date().toISOString(),
        updated_by: authData.user?.id,
      });

      if (error) throw error;
      toast.success(`Updated ${key}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to save change");
    } finally {
      setSavingKey(null);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl w-full mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-brand/10 text-accent-brand rounded-full text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" /> Content Management System
        </div>
        <h1 className="text-3xl font-extrabold text-foreground mt-2">Site Content & Settings</h1>
        <p className="text-sm text-muted-foreground">
          Update text copy, messaging, contact coordinates, and AI assistant settings without redeploying.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "general", label: "General & AI Assistant", icon: Bot },
          { id: "home", label: "Homepage Copy", icon: FileText },
          { id: "about", label: "About Page", icon: FileText },
          { id: "contact", label: "Contact Info", icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-foreground text-background shadow"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* General Tab: AI Chatbot Toggle */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-accent-brand" />
                <h3 className="font-bold text-foreground">AI Technical Assistant (Chatbot)</h3>
              </div>
              <p className="text-xs text-muted-foreground max-w-lg">
                Enable or disable the floating AI assistant for site visitors. When disabled, visitors will see standard WhatsApp & Phone CTAs only.
              </p>
            </div>
            <button
              onClick={() => {
                const current = content["settings.chat_enabled"] === "true";
                handleUpdate("settings.chat_enabled", current ? "false" : "true");
              }}
              disabled={savingKey === "settings.chat_enabled"}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all ${
                content["settings.chat_enabled"] === "true"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {content["settings.chat_enabled"] === "true" ? "Enabled (Live)" : "Disabled (Hidden)"}
            </button>
          </div>
        </div>
      )}

      {/* Homepage Tab */}
      {activeTab === "home" && (
        <div className="space-y-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Eyebrow Badge
              </label>
              <input
                type="text"
                value={content["home.hero.eyebrow"] || ""}
                onChange={(e) => setContent({ ...content, "home.hero.eyebrow": e.target.value })}
                onBlur={(e) => handleUpdate("home.hero.eyebrow", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Hero Title
              </label>
              <input
                type="text"
                value={content["home.hero.title"] || ""}
                onChange={(e) => setContent({ ...content, "home.hero.title": e.target.value })}
                onBlur={(e) => handleUpdate("home.hero.title", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Hero Subtitle
              </label>
              <textarea
                rows={3}
                value={content["home.hero.subtitle"] || ""}
                onChange={(e) => setContent({ ...content, "home.hero.subtitle": e.target.value })}
                onBlur={(e) => handleUpdate("home.hero.subtitle", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="space-y-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">About Page Copy</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                About Headline
              </label>
              <input
                type="text"
                value={content["about.intro.headline"] || ""}
                onChange={(e) => setContent({ ...content, "about.intro.headline": e.target.value })}
                onBlur={(e) => handleUpdate("about.intro.headline", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Intro Paragraph 1
              </label>
              <textarea
                rows={3}
                value={content["about.intro.body"] || ""}
                onChange={(e) => setContent({ ...content, "about.intro.body": e.target.value })}
                onBlur={(e) => handleUpdate("about.intro.body", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div className="space-y-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Phone & Email</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Primary Phone
              </label>
              <input
                type="text"
                value={content["contact.phone.primary"] || ""}
                onChange={(e) => setContent({ ...content, "contact.phone.primary": e.target.value })}
                onBlur={(e) => handleUpdate("contact.phone.primary", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={content["contact.email"] || ""}
                onChange={(e) => setContent({ ...content, "contact.email": e.target.value })}
                onBlur={(e) => handleUpdate("contact.email", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
