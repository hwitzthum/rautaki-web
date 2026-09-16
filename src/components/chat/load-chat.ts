// Everything the chat widget needs at runtime — the @n8n/chat bundle (Vue,
// markdown-it; ~500 KiB transferred) and its stylesheet — sits behind this
// module so the bundler emits it as one lazy chunk. N8nChatWidget imports it
// on the visitor's first intent to chat (hover, focus or click on the
// launcher), never during page load.

import "@/styles/n8n-chat.css";

export { createChat } from "@n8n/chat";
