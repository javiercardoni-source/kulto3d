"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LineBadge } from "@/components/brand/LineBadge";
import { useCart } from "@/context/CartContext";
import { formatARS } from "@/lib/format";

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, count, hydrated, setQuantity, remove, clear } =
    useCart();

  if (!hydrated) {
    return (
      <section className="bg-zinc-950 py-16 md:py-24">
        <Container>
          <div className="h-96 animate-pulse rounded-2xl bg-white/[0.03]" />
        </Container>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-zinc-950 py-20 md:py-32">
        <Container className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
            <ShoppingBag className="h-8 w-8 text-zinc-500" />
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Tu carrito está vacío
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Pasate por el catálogo y elegí algo que te guste.
          </p>
          <Link
            href="/productos"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-zinc-950 py-12 md:py-20">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Carrito
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Tu pedido
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              {count} {count === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="hidden text-sm text-zinc-500 transition-colors hover:text-white sm:block"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Items */}
          <div className="lg:col-span-2">
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => {
                const image =
                  product.images[0] ?? "/placeholder-product.svg";
                const lineTotal = product.price * quantity;

                return (
                  <li
                    key={product.id}
                    className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:p-6"
                  >
                    <Link
                      href={`/productos/${product.slug}`}
                      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-900 sm:h-32 sm:w-32"
                    >
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <LineBadge line={product.line} />
                          <Link
                            href={`/productos/${product.slug}`}
                            className="mt-2 block text-lg font-semibold text-white transition-colors hover:text-[color:var(--brand)]"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-sm text-zinc-500">
                            {formatARS(product.price)} c/u
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(product.id)}
                          className="text-zinc-500 transition-colors hover:text-red-400"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(product.id, quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                            aria-label="Disminuir"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(product.id, quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                            aria-label="Aumentar"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-lg font-bold text-white">
                          {formatARS(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={clear}
              className="mt-6 text-sm text-zinc-500 transition-colors hover:text-white sm:hidden"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-lg font-semibold text-white">Resumen</h2>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between text-zinc-400">
                  <dt>Subtotal</dt>
                  <dd className="text-white">{formatARS(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between text-zinc-500">
                  <dt>Envío</dt>
                  <dd className="text-xs">Calculado en checkout</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Total estimado
                </span>
                <span className="text-2xl font-bold text-white">
                  {formatARS(subtotal)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
              >
                Continuar con el pago
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/productos"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30"
              >
                Seguir comprando
              </Link>

              <p className="mt-6 text-xs leading-relaxed text-zinc-500">
                Imprimimos a pedido. Una vez confirmado el pago, empezamos a
                fabricar tu pieza. Te avisamos en cada paso.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
