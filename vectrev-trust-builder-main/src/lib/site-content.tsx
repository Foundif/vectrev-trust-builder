import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { contentDefaults } from "@/data/siteContent";

type Row = { key: string; value: string | null; image_url: string | null };
type Overrides = Record<string, { value?: string | null; image_url?: string | null }>;

const SiteContentContext = createContext<Overrides>({});

/** Loads CMS overrides and keeps them live via realtime updates. */
export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({});

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data } = await supabase.from("site_content").select("key,value,image_url");
      if (cancelled || !data) return;
      const next: Overrides = {};
      for (const r of data as Row[]) next[r.key] = { value: r.value, image_url: r.image_url };
      setOverrides(next);
    };

    load();

    const channel = supabase
      .channel("site-content-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content" },
        () => void load(),
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, []);

  return <SiteContentContext.Provider value={overrides}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const overrides = useContext(SiteContentContext);

  return useMemo(
    () => ({
      /** Editable text with the code default as fallback. */
      t: (key: string, fallback?: string) => {
        const v = overrides[key]?.value;
        return v && v.trim() ? v : (fallback ?? contentDefaults[key]?.value ?? "");
      },
      /** Editable image URL with the code default as fallback. */
      img: (key: string, fallback?: string) => {
        const v = overrides[key]?.image_url;
        return v && v.trim() ? v : (fallback ?? contentDefaults[key]?.image ?? "");
      },
      /** Editable boolean flag, e.g. the AI chatbot switch. */
      flag: (key: string, fallback = true) => {
        const v = overrides[key]?.value;
        if (v === undefined || v === null || v === "") {
          return (contentDefaults[key]?.value ?? String(fallback)) === "true";
        }
        return v === "true";
      },
    }),
    [overrides],
  );
}
