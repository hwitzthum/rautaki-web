"use client";

import { useEffect } from "react";
import "@/styles/n8n-chat.css";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL ?? "";

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
            "Welcome to Rautaki.",
            "Share your challenge and we will help structure the next move.",
          ],
          i18n: {
            en: {
              title: "Rautaki Advisory",
              subtitle: "Strategy · Advisory · Growth",
              footer: "",
              getStarted: "Start Conversation",
              inputPlaceholder: "Ask about AI strategy, risk, or execution...",
              closeButtonTooltip: "Close chat",
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
