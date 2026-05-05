import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <p className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
        404
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        The page you are looking for does not exist or may have moved. Head back
        to the home page or browse the available cars.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={cn(buttonVariants(), "inline-flex")}>
          Go home
        </Link>
        <Link
          href="/cars"
          className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
        >
          Browse cars
        </Link>
      </div>
    </div>
  );
}
