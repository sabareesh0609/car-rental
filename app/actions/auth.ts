"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionCookieValue,
  verifyCredentials,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth";

function safeCallbackUrl(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== "string") return null;
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return null;
  return t;
}

function withQuery(path: string, key: string, value: string): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

export async function loginAction(formData: FormData): Promise<{
  error: string;
} | void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const callbackRaw = String(formData.get("callbackUrl") ?? "").trim();
  const callback = safeCallbackUrl(callbackRaw);

  const user = verifyCredentials(email, password);
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const token = await createSessionCookieValue(user);
  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  if (user.role === "admin") {
    redirect(withQuery("/admin/dashboard", "loggedIn", "1"));
  }

  const dest = callback && callback !== "/login" ? callback : "/";
  redirect(withQuery(dest, "loggedIn", "1"));
}

export async function logoutAction(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect("/?loggedOut=1");
}
