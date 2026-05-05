"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/cars", label: "Cars" },
  { href: "/admin/bookings", label: "Bookings" },
];

export function AdminNav() {
  const pathname = usePathname();

  const footer = (
    <form action={logoutAction} className="w-full">
      <Button type="submit" variant="outline" className="w-full">
        Log out
      </Button>
    </form>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-border/80 bg-muted/20 md:block">
        <div className="sticky top-14 flex min-h-[calc(100vh-3.5rem)] flex-col p-4">
          <p className="px-3 pb-3 text-sm font-semibold text-foreground">
            Admin panel
          </p>
          <nav className="space-y-1">
            {items.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <form action={logoutAction} className="mt-auto pt-4">
            <Button type="submit" variant="outline" className="w-full">
              Log out
            </Button>
          </form>
        </div>
      </aside>

      <div className="border-b border-border/80 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Admin panel</p>
            <p className="text-xs text-muted-foreground">Manage cars and bookings</p>
          </div>
          <MobileNav items={items} footer={footer} />
        </div>
      </div>
    </>
  );
}
