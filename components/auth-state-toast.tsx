"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function AuthStateToast() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handled = useRef<string | null>(null);

  useEffect(() => {
    const key = `${pathname}?${searchParams.toString()}`;
    if (handled.current === key) {
      return;
    }
    handled.current = key;

    const loggedIn = searchParams.get("loggedIn") === "1";
    const loggedOut = searchParams.get("loggedOut") === "1";

    if (!loggedIn && !loggedOut) {
      return;
    }

    if (loggedIn) {
      toast.success("Signed in successfully.");
    }
    if (loggedOut) {
      toast.success("Logged out.");
    }

    const next = new URLSearchParams(searchParams.toString());
    next.delete("loggedIn");
    next.delete("loggedOut");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
