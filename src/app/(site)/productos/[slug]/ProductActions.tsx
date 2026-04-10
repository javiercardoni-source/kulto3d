"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { InstagramIcon } from "@/components/brand/icons";
import { useCart } from "@/context/CartContext";
import { whatsappLink, SITE } from "@/lib/site";
import {
  trackAddToCart,
  trackInstagram,
  trackViewItem,
  trackWhatsApp,
} from "@/lib/analytics";
import type { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
  soldOut: boolean;
  consultOnly: boolean;
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ProductActions({
  product,
  soldOut,
  consultOnly,
}: ProductActionsProps) {
  const router = useRouter();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Track view_item once when this client component mounts
  useEffect(() => {
    trackViewItem(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const message = `¡Hola Kulto3D! Me interesa *${product.name}*${
    consultOnly ? " (consulta por pieza a medida)" : ""
  }. ${SITE.url}/productos/${product.slug}`;

  const waHref = whatsappLink(message);
  const hasWhatsApp = SITE.whatsapp.number.length > 0;

  const handleAdd = () => {
    add(product, qty);
    trackAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    add(product, qty);
    trackAddToCart(product, qty);
    router.push("/cart");
  };

  const canBuy = !consultOnly && !soldOut;

  return (
    <div className="flex flex-col gap-4">
      {canBuy && (
        <>
          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Cantidad
            </span>
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQty((q) => Math.min(product.stock || 99, q + 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            {product.stock > 0 && (
              <span className="text-xs text-zinc-500">
                {product.stock} disponibles
              </span>
            )}
          </div>

          {/* Add to cart */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-[color:var(--brand)] hover:bg-white/10"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4 text-[color:var(--brand)]" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Agregar al carrito
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Comprar ahora
            </button>
          </div>
        </>
      )}

      {soldOut && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-zinc-400">
          Sin stock por ahora. Coordiná por WhatsApp si querés que lo
          imprimamos para vos.
        </div>
      )}

      {/* WhatsApp CTA */}
      <a
        href={hasWhatsApp ? waHref : SITE.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          hasWhatsApp
            ? trackWhatsApp("product_detail", product.slug)
            : trackInstagram("product_detail")
        }
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {hasWhatsApp
          ? consultOnly
            ? "Pedir cotización por WhatsApp"
            : "Consultar por WhatsApp"
          : "Escribinos por Instagram"}
      </a>

      {!hasWhatsApp && (
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackInstagram("product_detail_secondary")}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[color:var(--brand)]"
        >
          <InstagramIcon className="h-4 w-4" />
          @{SITE.instagram.handle}
        </a>
      )}
    </div>
  );
}
