import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Login</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Authentication is planned for{" "}
        <span className="font-medium text-foreground">Phase 3</span>. This page
        exists so the navbar link and route structure match the project plan.
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
