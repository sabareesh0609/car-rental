"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "md:hidden"
        )}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(100%,20rem)]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
