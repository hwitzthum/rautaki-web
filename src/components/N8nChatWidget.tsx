"use client";

import { useEffect } from "react";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL ??
  "https://n8n-service-ayxj.onrender.com/webhook/3c7ae152-893a-4893-a8da-dac3b2c8db05/chat";

declare global {
  interface Window {
    __n8nChatInitialized?: boolean;
  }
}

export default function N8nChatWidget() {
  useEffect(() => {
    if (window.__n8nChatInitialized) return;

    const initializeChat = async () => {
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
    };

    initializeChat();
  }, []);

  return <div id="n8n-chat" />;
}
