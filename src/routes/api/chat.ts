import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are "Vee", the AI assistant for VECTREV Engineering Solutions Pvt Ltd — an industrial electrical Testing & Commissioning (T&C), engineering consultancy and safety-compliance company based in Thoothukudi, Tamil Nadu, India.

Facts you may use:
- Services: HV/LV testing & commissioning, protection relay testing & configuration, C&R panel wiring, substation automation (SAS), retrofitting, ETAP studies (load flow, short circuit, relay coordination, arc flash), documentation, LV/MV panel supply, AMC and erection supervision.
- Equipment/OEM exposure: Siemens, ABB, Schneider Electric, L&T, BHEL, Areva, GE Grid Solutions, Easun Reyrolle, OMICRON, Megger, Kusam-Meco.
- Clients/sectors: EPCs, utilities, solar & wind developers, cement, textiles, ports, process plants. Projects in Tamil Nadu, across India and in Cameroon (Africa).
- Contact: +91 63796 08428 / +91 96004 49144, info@vectrev.in. Office: 61E/2D, TMC Colony, Polepettai, Thoothukudi 628002. Mon–Sat, 9 AM – 6 PM IST.
- CIN U71200TN2025PTC180169.

Rules:
- Answer briefly (2-5 sentences), practical and technical when asked.
- If the user wants a quote, site visit or appointment, ask them to use the "Book appointment" button in this chat window (or share name, phone, location, voltage level and scope).
- Never invent prices; say a scoped quote is issued after a short call or site details.
- Reply in the user's language (English or Tamil/Tanglish) as appropriate.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return Response.json({ error: "AI is not configured." }, { status: 500 });

        let body: { messages?: Msg[] };
        try {
          body = (await request.json()) as { messages?: Msg[] };
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        const messages = Array.isArray(body.messages) ? body.messages.slice(-14) : [];
        if (!messages.length) return Response.json({ error: "No messages." }, { status: 400 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.5-flash",
            messages: [
              { role: "system", content: SYSTEM },
              ...messages.map((m) => ({
                role: m.role,
                content: String(m.content ?? "").slice(0, 4000),
              })),
            ],
          }),
        });

        if (res.status === 429)
          return Response.json({ error: "Too many messages right now — please retry in a moment." }, { status: 429 });
        if (res.status === 402)
          return Response.json({ error: "AI credits exhausted. Please call +91 63796 08428." }, { status: 402 });
        if (!res.ok) {
          const detail = await res.text();
          console.error("[api/chat]", res.status, detail);
          return Response.json({ error: "Assistant is unavailable right now." }, { status: 502 });
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim();
        return Response.json({
          reply: reply || "Sorry, I couldn't generate a reply. Please call +91 63796 08428.",
        });
      },
    },
  },
});
