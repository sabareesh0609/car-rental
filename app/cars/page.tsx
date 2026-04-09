import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CarsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        The car catalog and filters are part of{" "}
        <span className="font-medium text-foreground">Phase 2</span>. For now,
        this route confirms navigation and layout.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline" }), "mt-8 inline-flex")}
      >
        Back to home
      </Link>
    </div>
  );
}
