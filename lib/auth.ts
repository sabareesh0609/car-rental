import { cookies } from "next/headers";
import usersJson from "@/data/users.json";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth-constants";
import {
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/session-token";
import { getAuthSecret } from "@/lib/session-secret";

export type { SessionPayload };

type UserRecord = {
  id: number;
  email: string;
  password: string;
  role: "user" | "admin";
  name: string;
};

const users = usersJson as UserRecord[];

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE };

export function verifyCredentials(
  email: string,
  password: string
): SessionPayload | null {
  const normalized = email.trim().toLowerCase();
  const user = users.find(
    (u) => u.email.toLowerCase() === normalized && u.password === password
  );
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}

export async function getSessionUser(): Promise<SessionPayload | null> {
  const raw = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!raw) return null;
  return verifySessionToken(raw, getAuthSecret());
}

export async function createSessionCookieValue(
  user: SessionPayload
): Promise<string> {
  return createSessionToken(user, getAuthSecret());
}
