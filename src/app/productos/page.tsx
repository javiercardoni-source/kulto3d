import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { getProducts } from "@/lib/data";
import { ProductListClient } from "./ProductListClient";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá los productos de Kulto3D: decoración, branding, soluciones funcionales y coleccionables. Diseño e impresión 3D hechos con pasión.",
};

export const revalidate = 300; // 5 min ISR

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="bg-zinc-950 py-16 md:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            Catálogo
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Todo lo que hacemos,<br />
            <span className="text-zinc-500">en un solo lugar.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            Cada pieza está diseñada e impresa por nosotros. Filtrá por línea,
            buscá lo que necesitás o escribinos por WhatsApp si querés algo a
            medida.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-2xl bg-white/[0.03]" />
          }
        >
          <ProductListClient products={products} />
        </Suspense>
      </Container>
    </section>
  );
}
