"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MobileNav, type NavItem } from "@/components/mobile-nav";
import { useAuth } from "@/components/providers/auth-provider";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

function buildNavItems(user: ReturnType<typeof useAuth>["user"]): NavItem[] {
  const base: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Cars" },
  ];
  if (!user) {
    base.push({ href: "/login", label: "Login" });
    return base;
  }
  base.push({ href: "/my-bookings", label: "My Bookings" });
  if (user.role === "admin") {
    base.push({ href: "/admin/dashboard", label: "Admin" });
  }
  return base;
}

export function Navbar() {
  const { user } = useAuth();
  const items = useMemo(() => buildNavItems(user), [user]);

  const mobileFooter =
    user != null ? (
      <form action={logoutAction} className="w-full">
        <Button type="submit" variant="outline" className="w-full">
          Log out
        </Button>
      </form>
    ) : undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          DriveEase
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <div className="ml-2 flex items-center gap-2 border-l border-border pl-3">
              <span className="max-w-[10rem] truncate text-sm text-muted-foreground">
                {user.name}
              </span>
              <form action={logoutAction}>
                <Button type="submit" variant="ghost" size="sm">
                  Log out
                </Button>
              </form>
            </div>
          ) : null}
        </nav>
        <MobileNav items={items} footer={mobileFooter} />
      </div>
    </header>
  );
}
