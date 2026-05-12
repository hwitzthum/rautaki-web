"use client";

import { useEffect } from "react";
import "@/styles/n8n-chat.css";

const RAW_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL ?? "";

function isHttpsUrl(url: string): boolean {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

const WEBHOOK_URL = isHttpsUrl(RAW_WEBHOOK_URL) ? RAW_WEBHOOK_URL : "";

declare global {
  interface Window {
    __n8nChatInitialized?: boolean;
  }
}

export default function N8nChatWidget() {
  useEffect(() => {
    if (!WEBHOOK_URL || window.__n8nChatInitialized) return;

    const initializeChat = async () => {
      try {
        const { createChat } = await import("@n8n/chat");

        createChat({
          webhookUrl: WEBHOOK_URL,
          target: "#n8n-chat",
          mode: "window",
          showWelcomeScreen: false,
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
              inputPlaceholder: "Fragen zu KI-Strategie, Leistungen oder nächsten Schritten...",
              closeButtonTooltip: "Chat schliessen",
            },
          },
        });

        window.__n8nChatInitialized = true;
      } catch {
        // Chat widget may fail due to CORS in local dev — non-critical
      }
    };

    initializeChat();
  }, []);

  return <div id="n8n-chat" />;
}
