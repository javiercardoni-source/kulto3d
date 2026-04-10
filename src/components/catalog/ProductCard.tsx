import Link from "next/link";
import Image from "next/image";
import { LineBadge } from "@/components/brand/LineBadge";
import { PriceTag } from "./PriceTag";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0] ?? "/placeholder-product.svg";
  const soldOut = product.stock === 0 && product.price > 0;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-900">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <LineBadge line={product.line} />
        </div>
        {soldOut && (
          <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur">
            Sin stock
          </div>
        )}
        {product.featured && !soldOut && (
          <div className="absolute right-3 top-3 rounded-full bg-[color:var(--brand)]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
            Destacado
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold leading-tight text-white transition-colors group-hover:text-[color:var(--brand)]">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-zinc-400">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <PriceTag value={product.price} size="md" />
          <span className="text-xs text-zinc-500">Ver detalle →</span>
        </div>
      </div>
    </Link>
  );
}
