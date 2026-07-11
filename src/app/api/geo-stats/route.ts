import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { BOT_SLUGS, REFERRER_SLUGS } from "@/lib/geo-track";

// Read-back for the GEO counters written by src/proxy.ts (roadmap P7).
// Returns monthly aggregate counts of AI-referred visits and AI-crawler
// hits — no PII, pure counters, so the endpoint is public but rate-limited.
// Consumed by the monthly n8n GEO digest workflow.
//
//   GET /api/geo-stats            → current + previous month
//   GET /api/geo-stats?months=6   → last 6 months (max 13)

export const dynamic = "force-dynamic";

function monthKeys(count: number): string[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1),
    );
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  });
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request) ?? "unknown";
  const limited = await checkRateLimit("geo-stats", ip, 10, 60);
  if (limited !== "ok") {
    return NextResponse.json(
      { error: limited === "limited" ? "Too many requests" : "Unavailable" },
      { status: limited === "limited" ? 429 : 503 },
    );
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const monthsParam = Number(request.nextUrl.searchParams.get("months"));
  const months = monthKeys(
    Number.isInteger(monthsParam) && monthsParam >= 1 && monthsParam <= 13
      ? monthsParam
      : 2,
  );

  // One MGET across every (month × slug) combination — bounded key space,
  // single round trip.
  const keys = months.flatMap((m) => [
    ...REFERRER_SLUGS.map((s) => `geo:${m}:ref:${s}`),
    ...BOT_SLUGS.map((s) => `geo:${m}:bot:${s}`),
  ]);

  const res = await fetch(
    `${url}/mget/${keys.map(encodeURIComponent).join("/")}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return NextResponse.json({ error: "Store unavailable" }, { status: 503 });
  }
  const { result } = (await res.json()) as { result: (string | null)[] };

  let i = 0;
  const data: Record<
    string,
    { referrals: Record<string, number>; crawlers: Record<string, number> }
  > = {};
  for (const m of months) {
    const referrals: Record<string, number> = {};
    const crawlers: Record<string, number> = {};
    for (const s of REFERRER_SLUGS) {
      const v = Number(result[i++]);
      if (v > 0) referrals[s] = v;
    }
    for (const s of BOT_SLUGS) {
      const v = Number(result[i++]);
      if (v > 0) crawlers[s] = v;
    }
    data[m] = { referrals, crawlers };
  }

  return NextResponse.json(
    { generatedAt: new Date().toISOString(), months: data },
    { headers: { "Cache-Control": "no-store" } },
  );
}
