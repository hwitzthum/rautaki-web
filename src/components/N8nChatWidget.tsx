"use client";

import { useEffect } from "react";
import "@/styles/n8n-chat.css";

// The widget always talks to our same-origin proxy at /api/chat. The proxy
// is responsible for: origin gating, rate limiting, HMAC-signing the upstream
// request to n8n, validating input, and filtering bot output. See
// src/app/api/chat/route.ts and security/chatbot-hardening-plan.md.
const WEBHOOK_URL = "/api/chat";

declare global {
  interface Window {
    __n8nChatInitialized?: boolean;
  }
}

export default function N8nChatWidget() {
  useEffect(() => {
    if (window.__n8nChatInitialized) return;

    const initializeChat = async () => {
      try {
        const { createChat } = await import("@n8n/chat");

        createChat({
          webhookUrl: WEBHOOK_URL,
          target: "#n8n-chat",
          mode: "window",
          showWelcomeScreen: false,
          // History disclosure defence (H1 in chatbot-hardening-plan.md):
          // @n8n/chat defaults loadPreviousSession to true and keys it only
          // by a client-side UUID in localStorage. With this set to false
          // the widget never fires the "loadPreviousSession" action, so a
          // stolen sessionId can't pull conversation history.
          loadPreviousSession: false,
          initialMessages: [
            "Willkommen bei Rautaki.",
            "Schildern Sie Ihre Frage — wir helfen Ihnen, den nächsten Schritt zu definieren.",
          ],
          i18n: {
            en: {
              title: "Rautaki",
              subtitle: "Strategie · Beratung · Umsetzung",
              footer: "",
              getStarted: "Gespräch starten",
              inputPlaceholder:
                "Fragen zu KI-Strategie, Leistungen oder nächsten Schritten...",
              closeButtonTooltip: "Chat schliessen",
            },
          },
        });

        window.__n8nChatInitialized = true;
      } catch {
        // Chat widget may fail to import during local SSR — non-critical.
      }
    };

    initializeChat();
  }, []);

  return <div id="n8n-chat" />;
}
