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
    redirect("/admin/dashboard");
  }

  const dest =
    callback && callback !== "/login" ? callback : "/";
  redirect(dest);
}

export async function logoutAction(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect("/");
}
