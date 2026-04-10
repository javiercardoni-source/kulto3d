/**
 * Kulto3D — Analytics helper
 *
 * Wraps Google Analytics 4 (gtag) with typed events for the
 * e-commerce funnel + custom CTAs.
 *
 * If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is missing, all calls are no-op
 * (safe in dev or before GA is configured).
 */

import type { CartItem, Product } from "@/types";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "set",
      action: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const isGAEnabled = (): boolean =>
  typeof window !== "undefined" &&
  Boolean(GA_MEASUREMENT_ID) &&
  typeof window.gtag === "function";

function track(action: string, params?: Record<string, unknown>): void {
  if (!isGAEnabled()) return;
  try {
    window.gtag!("event", action, params);
  } catch (err) {
    console.error("[analytics]", err);
  }
}

// ============= Page tracking =============

export function trackPageView(url: string): void {
  if (!isGAEnabled()) return;
  window.gtag!("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

// ============= E-commerce events =============

function productToItem(product: Product, quantity = 1) {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.line,
    item_variant: product.slug,
    price: product.price,
    quantity,
  };
}

export function trackViewItem(product: Product): void {
  track("view_item", {
    currency: "ARS",
    value: product.price,
    items: [productToItem(product)],
  });
}

export function trackAddToCart(product: Product, quantity = 1): void {
  track("add_to_cart", {
    currency: "ARS",
    value: product.price * quantity,
    items: [productToItem(product, quantity)],
  });
}

export function trackBeginCheckout(items: CartItem[], subtotal: number): void {
  track("begin_checkout", {
    currency: "ARS",
    value: subtotal,
    items: items.map(({ product, quantity }) =>
      productToItem(product, quantity),
    ),
  });
}

export function trackPurchase(
  orderCode: string,
  total: number,
  shippingCost: number,
  items: CartItem[],
): void {
  track("purchase", {
    transaction_id: orderCode,
    currency: "ARS",
    value: total,
    shipping: shippingCost,
    items: items.map(({ product, quantity }) =>
      productToItem(product, quantity),
    ),
  });
}

export function trackSelectLine(line: string): void {
  track("select_content", {
    content_type: "product_line",
    item_id: line,
  });
}

// ============= Custom CTAs =============

export function trackCTA(label: string, location: string): void {
  track("cta_click", {
    cta_label: label,
    cta_location: location,
  });
}

export function trackWhatsApp(location: string, productSlug?: string): void {
  track("whatsapp_click", {
    cta_location: location,
    product_slug: productSlug,
  });
}

export function trackInstagram(location: string): void {
  track("instagram_click", {
    cta_location: location,
  });
}
