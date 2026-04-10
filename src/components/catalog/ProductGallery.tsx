"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : ["/placeholder-product.svg"];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        <Image
          src={gallery[active] ?? "/placeholder-product.svg"}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {gallery.map((img, idx) => (
            <button
              key={img + idx}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border bg-zinc-900 transition-all",
                idx === active
                  ? "border-[color:var(--brand)]"
                  : "border-white/10 hover:border-white/30",
              )}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${name} ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
