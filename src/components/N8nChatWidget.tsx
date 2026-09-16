"use client";

import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

// The widget always talks to our same-origin proxy at /api/chat. The proxy
// is responsible for: origin gating, rate limiting, HMAC-signing the upstream
// request to n8n, validating input, and filtering bot output. See
// src/app/api/chat/route.ts and security/chatbot-hardening-plan.md.
// The page locale travels as a query param (not in the @n8n/chat body, whose
// shape is library-controlled); the proxy whitelists it and forwards it in
// the signed payload so the bot can localise fallback language and links.
const webhookUrlFor = (locale: Locale) =>
  locale === "en" ? "/api/chat?locale=en" : "/api/chat";

declare global {
  interface Window {
    __n8nChatInitialized?: boolean;
  }
}

// Facade: until the visitor shows intent, only a lightweight launcher button
// renders — styled to match the widget's own toggle as it computes on the live
// site (size, colours and position come from the #n8n-chat overrides in
// src/app/globals.css; keep both in sync) so nothing jumps when the real
// widget takes over. The widget bundle is fetched on hover/focus (warm-up) and
// mounted on click, which then opens the chat window directly.
let chatModule: Promise<typeof import("./chat/load-chat")> | null = null;
const loadChatModule = () => (chatModule ??= import("./chat/load-chat"));

// The widget renders its toggle asynchronously after createChat(); wait for it
// (bounded) so we can open the window the visitor asked for.
function waitForToggle(timeoutMs = 3000): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const started = performance.now();
    const check = () => {
      const toggle = document.querySelector<HTMLElement>(
        "#n8n-chat .chat-window-toggle",
      );
      if (toggle) return resolve(toggle);
      if (performance.now() - started > timeoutMs) return resolve(null);
      requestAnimationFrame(check);
    };
    check();
  });
}

export default function N8nChatWidget({ locale }: { locale: Locale }) {
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const mounted = useRef(true);
  const common = getContent(locale).common;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const openChat = async () => {
    if (state !== "idle" || window.__n8nChatInitialized) return;
    // Claim the slot before the async import so a double click can't run
    // createChat twice into the same target.
    window.__n8nChatInitialized = true;
    setState("loading");

    // English visitors are invited to write in English; the bot follows the
    // visitor's language and uses the page locale (sent via the proxy URL)
    // as fallback for ambiguous input.
    const initialMessages =
      locale === "en"
        ? [...common.chat.initialMessages, "Feel free to write in English."]
        : common.chat.initialMessages;

    try {
      const { createChat } = await loadChatModule();

      createChat({
        webhookUrl: webhookUrlFor(locale),
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

      const toggle = await waitForToggle();
      toggle?.click();
      if (mounted.current) setState("ready");
    } catch {
      // Network hiccup or blocked chunk — release the slot and keep the
      // launcher so the next click retries.
      window.__n8nChatInitialized = false;
      chatModule = null;
      if (mounted.current) setState("idle");
    }
  };

  return (
    <>
      <div id="n8n-chat" />
      {state !== "ready" && (
        <button
          type="button"
          onClick={openChat}
          onPointerEnter={loadChatModule}
          onFocus={loadChatModule}
          aria-label={common.chat.openButtonLabel}
          aria-busy={state === "loading"}
          className="fixed bottom-[0.45rem] right-[0.4rem] z-[1400] flex h-[52px] w-[52px] cursor-pointer items-center justify-center border border-t-2 border-white/12 border-t-[#f5a623] bg-[#e8a236] text-[#090b10] shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition-[transform,background] duration-150 hover:scale-105 hover:bg-[#d6932d] focus-visible:scale-105 focus-visible:bg-[#d6932d] active:scale-95 active:bg-[#c48728] disabled:cursor-progress min-[769px]:bottom-[0.9rem] min-[769px]:right-[0.9rem]"
          disabled={state === "loading"}
        >
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            aria-hidden="true"
            className={state === "loading" ? "animate-pulse" : undefined}
          >
            <path
              fill="currentColor"
              d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8"
            />
          </svg>
        </button>
      )}
    </>
  );
}
