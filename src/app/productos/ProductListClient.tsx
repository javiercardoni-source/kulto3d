"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { LineFilter } from "@/components/catalog/LineFilter";
import { SearchBar } from "@/components/catalog/SearchBar";
import { EmptyState } from "@/components/catalog/EmptyState";
import { normalizeText } from "@/lib/format";
import type { Product, ProductLine } from "@/types";

const VALID_LINES: ProductLine[] = [
  "deco",
  "branding",
  "construction",
  "collectibles",
];

interface ProductListClientProps {
  products: Product[];
}

export function ProductListClient({ products }: ProductListClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLine = (() => {
    const param = searchParams.get("line");
    return param && VALID_LINES.includes(param as ProductLine)
      ? (param as ProductLine)
      : "all";
  })();

  const [line, setLineState] = useState<ProductLine | "all">(initialLine);
  const [query, setQuery] = useState("");

  // Sync URL when line changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (line === "all") {
      params.delete("line");
    } else {
      params.set("line", line);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);

  const setLine = (value: ProductLine | "all") => setLineState(value);

  const counts = useMemo(() => {
    const acc: Record<string, number> = {
      deco: 0,
      branding: 0,
      construction: 0,
      collectibles: 0,
    };
    for (const p of products) {
      acc[p.line] = (acc[p.line] ?? 0) + 1;
    }
    return acc;
  }, [products]);

  const filtered = useMemo(() => {
    const nq = normalizeText(query.trim());
    return products.filter((p) => {
      if (line !== "all" && p.line !== line) return false;
      if (!nq) return true;
      const haystack = normalizeText(
        `${p.name} ${p.shortDescription} ${p.description}`,
      );
      return haystack.includes(nq);
    });
  }, [products, line, query]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <LineFilter active={line} onChange={setLine} counts={counts} />
        <SearchBar
          value={query}
          onChange={setQuery}
          className="md:w-80"
        />
      </div>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <EmptyState
          title={query ? "Nada coincide con tu búsqueda" : undefined}
          description={
            query
              ? "Probá con otra palabra o borrá los filtros."
              : undefined
          }
        />
      )}
    </div>
  );
}
