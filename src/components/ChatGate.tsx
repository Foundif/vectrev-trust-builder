import { ChatWidget } from "@/components/ChatWidget";
import { useSiteContent } from "@/lib/site-content";

/** Renders the AI assistant only when the admin toggle is on. */
export function ChatGate() {
  const { flag } = useSiteContent();
  if (!flag("settings.chat_enabled", true)) return null;
  return <ChatWidget />;
}
