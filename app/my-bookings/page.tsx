import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My bookings",
};

export default async function MyBookingsPage() {
  const user = await getSessionUser();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">My bookings</h1>
      <p className="mt-3 text-muted-foreground">
        Signed in as{" "}
        <span className="font-medium text-foreground">{user?.email}</span>.
      </p>
      <p className="mt-6 max-w-xl text-sm text-muted-foreground">
        The booking list and create-booking flow are implemented in Phase 4.
        This page is here so the navbar link and route protection match the
        project plan.
      </p>
    </div>
  );
}
