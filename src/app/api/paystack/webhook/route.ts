import crypto from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withDb } from "@/lib/db";
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

  try {
    await withDb((db) =>
      db.query(
        `insert into ticket_orders (reference, status, email, amount_kobo, currency, tier, paid_at, raw_payload)
         values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
         on conflict (reference) do update set
           status = excluded.status,
           email = excluded.email,
           amount_kobo = excluded.amount_kobo,
           currency = excluded.currency,
           tier = excluded.tier,
           paid_at = excluded.paid_at,
           raw_payload = excluded.raw_payload`,
        [
          data.reference,
          data.status,
          data.customer?.email ?? null,
          data.amount ?? null,
          data.currency ?? null,
          resolveTier(data.amount),
          data.paid_at ?? null,
          JSON.stringify(event),
        ]
      )
    );
  } catch (error) {
    console.error("Failed to save ticket order:", error);
    return NextResponse.json({ error: "Failed to persist" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
