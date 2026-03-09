import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.N8N_BOOKING_WEBHOOK_URL ??
  "https://n8n-service-ayxj.onrender.com/webhook/booking";

interface BookingPayload {
  name: string;
  company: string;
  email: string;
  topic: string;
  date: string;
  message: string;
}

function isValidPayload(body: unknown): body is BookingPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.length > 0 &&
    b.name.length <= 200 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.topic === "string" &&
    b.topic.length > 0 &&
    b.topic.length <= 500 &&
    typeof b.date === "string" &&
    (typeof b.company === "string" || b.company === undefined) &&
    (typeof b.message === "string" || b.message === undefined)
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Invalid booking data" },
      { status: 400 }
    );
  }

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name,
      company: body.company ?? "",
      email: body.email,
      topic: body.topic,
      date: body.date,
      message: body.message ?? "",
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Booking service unavailable" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}