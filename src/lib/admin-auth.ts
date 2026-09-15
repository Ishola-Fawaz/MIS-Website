import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "mis_admin_session";

function digest(value: string) {
  return crypto.createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  return crypto.timingSafeEqual(digest(a), digest(b));
}

export function expectedSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  }
  return crypto.createHmac("sha256", secret).update("mis-admin").digest("hex");
}

export function verifyPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !input) return false;
  return safeEqual(input, expected);
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  return safeEqual(token, expectedSessionToken());
}
