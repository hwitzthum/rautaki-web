"use client";

import { useEffect } from "react";
import "@/styles/n8n-chat.css";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

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

export default function N8nChatWidget({ locale }: { locale: Locale }) {
  useEffect(() => {
    const common = getContent(locale).common;
    // English visitors are invited to write in English; the bot's reply
    // language is configured n8n-side (tracked in the GEO roadmap, P6).
    const initialMessages =
      locale === "en"
        ? [...common.chat.initialMessages, "Feel free to write in English."]
        : common.chat.initialMessages;

    if (window.__n8nChatInitialized) return;
    // Claim the slot before the async import — otherwise a second mount
    // (React StrictMode in dev) passes the guard while the first import is
    // still in flight and createChat runs twice into the same target.
    window.__n8nChatInitialized = true;

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
          initialMessages,
          i18n: {
            en: {
              title: common.chat.title,
              subtitle: common.chat.subtitle,
              footer: "",
              getStarted: common.chat.getStarted,
              inputPlaceholder: common.chat.inputPlaceholder,
              closeButtonTooltip: common.chat.closeButtonTooltip,
            },
          },
        });
      } catch {
        // Chat widget may fail to import during local SSR — non-critical.
        // Release the slot so a later mount can retry.
        window.__n8nChatInitialized = false;
      }
    };

    initializeChat();
  }, [locale]);

  return <div id="n8n-chat" />;
}
