import Link from "next/link";
import { MobileNav, type NavItem } from "@/components/mobile-nav";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/login", label: "Login" },
];

export function Navbar() {
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
