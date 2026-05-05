import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdminUser } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminUser();

  return (
    <div className="md:flex">
      <AdminNav />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
