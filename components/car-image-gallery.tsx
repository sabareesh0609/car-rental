"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CarImageGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [index, setIndex] = useState(0);
  const safe = images.filter(Boolean);
  const current = safe[index] ?? "";

  if (safe.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
        No image
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
        <Image
          key={current}
          src={current}
          alt={`${name} — photo ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {safe.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {safe.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-background transition-all",
                i === index
                  ? "ring-primary"
                  : "ring-transparent opacity-80 hover:opacity-100"
              )}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === index}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
