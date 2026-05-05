"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function MyBookingsBookedToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (searchParams.get("booked") !== "1") return;
    fired.current = true;
    toast.success("Booking confirmed.");
    router.replace("/my-bookings", { scroll: false });
  }, [searchParams, router]);

  return null;
}
