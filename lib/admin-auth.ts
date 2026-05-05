import { redirect } from "next/navigation";
import { getSessionUser, type SessionPayload } from "@/lib/auth";

export async function requireAdminUser(): Promise<SessionPayload> {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?callbackUrl=/admin/dashboard");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return user;
}
