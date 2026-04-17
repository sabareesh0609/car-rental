import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

export default async function AdminDashboardPage() {
  const user = await getSessionUser();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin dashboard</h1>
      <p className="mt-3 text-muted-foreground">
        Welcome,{" "}
        <span className="font-medium text-foreground">{user?.name}</span>.
      </p>
      <p className="mt-6 max-w-xl text-sm text-muted-foreground">
        Full admin CRUD and booking management arrive in Phase 5. For now this
        route confirms mock authentication and role checks.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline" }), "mt-8 inline-flex")}
      >
        Back to site
      </Link>
    </div>
  );
}
