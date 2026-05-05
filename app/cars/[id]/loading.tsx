import { Skeleton } from "@/components/ui/skeleton";

export default function CarDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Skeleton className="mb-8 h-8 w-28" />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  );
}
