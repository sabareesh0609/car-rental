import { getAuthSecret } from "@/lib/session-secret";

export type SessionPayload = {
  id: number;
  email: string;
  role: "user" | "admin";
  name: string;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(s: string): Uint8Array {
  const padded =
    s.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((s.length + 3) % 4);
  const binary = atob(padded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(
  payload: SessionPayload,
  secret: string = getAuthSecret()
): Promise<string> {
  const body = new TextEncoder().encode(JSON.stringify(payload));
  const key = await importHmacKey(secret);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, body));
  return `${bytesToBase64Url(body)}.${bytesToBase64Url(sig)}`;
}

function isValidPayload(x: unknown): x is SessionPayload {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "number" &&
    typeof o.email === "string" &&
    typeof o.name === "string" &&
    (o.role === "user" || o.role === "admin")
  );
}

export async function verifySessionToken(
  token: string,
  secret: string = getAuthSecret()
): Promise<SessionPayload | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [bodyB64, sigB64] = parts;
  let body: Uint8Array;
  let sig: Uint8Array;
  try {
    body = base64UrlToBytes(bodyB64);
    sig = base64UrlToBytes(sigB64);
  } catch {
    return null;
  }
  const key = await importHmacKey(secret);
  const bodyBuf = new Uint8Array(body);
  const sigBuf = new Uint8Array(sig);
  const ok = await crypto.subtle.verify("HMAC", key, sigBuf, bodyBuf);
  if (!ok) return null;
  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(body));
    return isValidPayload(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
