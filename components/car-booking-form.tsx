"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createBookingAction } from "@/app/actions/booking";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { computeBookingTotal } from "@/lib/booking-math";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function isNextRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

function formatInr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

type Props = {
  carId: number;
  carName: string;
  pricePerDay: number;
  minDate: string;
};

export function CarBookingForm({
  carId,
  carName,
  pricePerDay,
  minDate,
}: Props) {
  const [pickup, setPickup] = useState("");
  const [ret, setRet] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const preview = useMemo(() => {
    if (!pickup || !ret) return null;
    return computeBookingTotal(pricePerDay, pickup, ret);
  }, [pickup, ret, pricePerDay]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await createBookingAction(new FormData(e.currentTarget));
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      if (isNextRedirectError(err)) return;
      setError("Could not complete booking. Please try again.");
      toast.error("Could not complete booking. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Book {carName}</CardTitle>
        <CardDescription>
          Pickup and return are charged as inclusive calendar days at{" "}
          {formatInr(pricePerDay)} per day.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <input type="hidden" name="carId" value={String(carId)} />
          <div className="space-y-2">
            <Label htmlFor="pickupDate">Pickup date</Label>
            <Input
              id="pickupDate"
              name="pickupDate"
              type="date"
              required
              min={minDate}
              value={pickup}
              onChange={(ev) => setPickup(ev.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnDate">Return date</Label>
            <Input
              id="returnDate"
              name="returnDate"
              type="date"
              required
              min={pickup || minDate}
              value={ret}
              onChange={(ev) => setRet(ev.target.value)}
            />
          </div>
          {preview ? (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {preview.days}
              </span>{" "}
              day{preview.days === 1 ? "" : "s"} · Estimated total{" "}
              <span className="font-semibold text-foreground">
                {formatInr(preview.totalPrice)}
              </span>
            </p>
          ) : null}
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Booking…" : "Confirm booking"}
          </Button>
          <Link
            href={`/cars/${carId}`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Cancel
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
