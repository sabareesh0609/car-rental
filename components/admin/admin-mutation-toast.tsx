"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function AdminMutationToast() {
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

    const error = searchParams.get("error");
    const created = searchParams.get("created") === "1";
    const deleted = searchParams.get("deleted") === "1";
    const updated = searchParams.get("updated");

    if (!error && !created && !deleted && !updated) {
      return;
    }

    if (error) {
      toast.error(error);
    } else if (created) {
      toast.success("Car created.");
    } else if (deleted) {
      toast.success("Car deleted.");
    } else if (updated) {
      toast.success(pathname.includes("/bookings") ? "Booking status updated." : "Car updated.");
    }

    const next = new URLSearchParams(searchParams.toString());
    next.delete("error");
    next.delete("created");
    next.delete("deleted");
    next.delete("updated");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
