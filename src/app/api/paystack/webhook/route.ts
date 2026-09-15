import crypto from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { TICKETS } from "@/lib/data";

function resolveTier(amountKobo: number | undefined) {
  if (!amountKobo) return null;
  const match = TICKETS.find((ticket) => {
    const kobo = Math.round(parseFloat(ticket.price.replace(/[₦,]/g, "")) * 100);
    return kobo === amountKobo;
  });
  return match?.name ?? null;
}

function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error("PAYSTACK_SECRET_KEY is not configured.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");
  const expectedSignature = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");

  if (!signature || !safeEqual(signature, expectedSignature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const data = event.data;
  const { error } = await supabaseAdmin.from("ticket_orders").upsert(
    {
      reference: data.reference,
      status: data.status,
      email: data.customer?.email ?? null,
      amount_kobo: data.amount ?? null,
      currency: data.currency ?? null,
      tier: resolveTier(data.amount),
      paid_at: data.paid_at ?? null,
      raw_payload: event,
    },
    { onConflict: "reference" }
  );

  if (error) {
    console.error("Failed to save ticket order:", error.message);
    return NextResponse.json({ error: "Failed to persist" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
