"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartIcon() {
  const { count, hydrated } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
      aria-label={`Carrito${count > 0 ? ` (${count} items)` : ""}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {hydrated && count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--brand)] px-1 text-[10px] font-bold text-black">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
