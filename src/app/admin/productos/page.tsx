import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2 } from "lucide-react";
import { getAdminClient } from "@/lib/supabase/admin";
import { mapProductFromDB } from "@/lib/mappers";
import { LineBadge } from "@/components/brand/LineBadge";
import { formatARS } from "@/lib/format";
import type { Product } from "@/types";

export const dynamic = "force-dynamic";

async function getAllProducts(): Promise<Product[]> {
  const sb = getAdminClient();
  if (!sb) return [];

  const { data, error } = await sb
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin/productos] error", error);
    return [];
  }

  return (data ?? []).map(mapProductFromDB);
}

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Productos</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Gestioná el catálogo. {products.length} producto
            {products.length !== 1 && "s"} en total.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-16 text-center">
          <p className="text-zinc-400">
            Todavía no cargaste ningún producto.
          </p>
          <Link
            href="/admin/productos/nuevo"
            className="mt-4 inline-flex items-center gap-2 text-sm text-[color:var(--brand)] hover:underline"
          >
            Crear el primero →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-left text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Línea</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 text-right font-medium">Precio</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => {
                const image = product.images[0] ?? "/placeholder-product.svg";
                return (
                  <tr key={product.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-zinc-900">
                          <Image
                            src={image}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {product.name}
                          </div>
                          <div className="text-xs text-zinc-500">
                            /{product.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <LineBadge line={product.line} />
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-300">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                          product.status === "active"
                            ? "border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 text-[color:var(--brand)]"
                            : "border border-white/15 bg-white/5 text-zinc-400"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-white tabular-nums">
                      {product.price > 0
                        ? formatARS(product.price)
                        : "Consultar"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
                        aria-label="Editar"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
