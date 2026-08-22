export type JsonObjectResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; status: 400 | 413 };

/** Parse a bounded JSON request body and require a plain object envelope. */
export async function readJsonObject(
  request: Request,
  maxBytes = 64 * 1024,
): Promise<JsonObjectResult> {
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400 };
  }
  if (Buffer.byteLength(raw, "utf8") > maxBytes) {
    return { ok: false, status: 413 };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, status: 400 };
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed)
  ) {
    return { ok: false, status: 400 };
  }
  return { ok: true, body: parsed as Record<string, unknown> };
}
