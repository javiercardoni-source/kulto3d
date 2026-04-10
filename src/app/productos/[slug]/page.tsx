import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LineBadge } from "@/components/brand/LineBadge";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { PriceTag } from "@/components/catalog/PriceTag";
import { ProductActions } from "./ProductActions";
import { getProductBySlug, getProducts } from "@/lib/data";
import { getLine } from "@/lib/brand";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const image = product.images[0] ?? "/placeholder-product.svg";

  return {
    title: product.name,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Kulto3D`,
      description: product.shortDescription,
      images: [{ url: image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const line = getLine(product.line);
  const soldOut = product.stock === 0 && product.price > 0;
  const consultOnly = product.price === 0;

  return (
    <section className="bg-zinc-950 py-12 md:py-20">
      <Container>
        <Link
          href="/productos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <LineBadge line={product.line} size="md" className="self-start" />

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-zinc-300">
              {product.shortDescription}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <PriceTag value={product.price} size="lg" />
              {soldOut && (
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Sin stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-8 space-y-4 border-t border-white/10 pt-8 text-zinc-300 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Specs */}
            {(product.materials.length > 0 ||
              product.dimensions ||
              product.leadTimeDays !== null) && (
              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
                {product.materials.length > 0 && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Materiales
                    </dt>
                    <dd className="mt-1.5 text-sm text-white">
                      {product.materials.join(" · ")}
                    </dd>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Medidas
                    </dt>
                    <dd className="mt-1.5 text-sm text-white">
                      {product.dimensions.width} × {product.dimensions.height}
                      {product.dimensions.depth
                        ? ` × ${product.dimensions.depth}`
                        : ""}{" "}
                      {product.dimensions.unit ?? "cm"}
                    </dd>
                  </div>
                )}
                {product.leadTimeDays !== null && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Tiempo de producción
                    </dt>
                    <dd className="mt-1.5 text-sm text-white">
                      {product.leadTimeDays} días hábiles
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Línea
                  </dt>
                  <dd className="mt-1.5 text-sm text-white">
                    {line.emoji} {line.label}
                  </dd>
                </div>
              </dl>
            )}

            {/* Actions */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <ProductActions
                product={product}
                soldOut={soldOut}
                consultOnly={consultOnly}
              />
            </div>

            {/* Brand note */}
            <p className="mt-8 text-xs leading-relaxed text-zinc-500">
              Todas nuestras piezas se imprimen a pedido con el mismo cuidado
              que tendríamos si fueran para nuestra propia casa. De nuestras
              manos a tu espacio.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
