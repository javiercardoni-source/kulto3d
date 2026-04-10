import type { Category, Order, Product, ProductDimensions } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function mapProductFromDB(row: any): Product {
  return {
    id: String(row.id),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    description: String(row.description ?? ""),
    shortDescription: String(row.short_description ?? ""),
    line: row.line,
    categoryId: row.category_id ? String(row.category_id) : null,
    price: Number(row.price ?? 0),
    stock: Number(row.stock ?? 0),
    images: Array.isArray(row.images) ? row.images.map(String) : [],
    featured: Boolean(row.featured),
    status: row.status ?? "active",
    materials: Array.isArray(row.materials) ? row.materials.map(String) : [],
    dimensions: row.dimensions
      ? (row.dimensions as ProductDimensions)
      : null,
    leadTimeDays:
      row.lead_time_days === null || row.lead_time_days === undefined
        ? null
        : Number(row.lead_time_days),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
  };
}

export function mapCategoryFromDB(row: any): Category {
  return {
    id: String(row.id),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    line: row.line,
    description: String(row.description ?? ""),
    icon: row.icon ?? null,
    color: row.color ?? null,
    createdAt: String(row.created_at ?? ""),
  };
}

export function mapOrderFromDB(row: any): Order {
  return {
    id: String(row.id),
    code: String(row.code ?? ""),
    userId: row.user_id ? String(row.user_id) : null,
    customer: row.customer ?? { name: "", email: "", phone: "" },
    shippingAddress: row.shipping_address ?? {
      street: "",
      number: "",
      city: "",
      province: "",
      zip: "",
    },
    items: Array.isArray(row.items) ? row.items : [],
    subtotal: Number(row.subtotal ?? 0),
    shippingCost: Number(row.shipping_cost ?? 0),
    total: Number(row.total ?? 0),
    paymentMethod: row.payment_method,
    paymentRef: row.payment_ref ?? null,
    status: row.status ?? "pending",
    notes: row.notes ?? null,
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
  };
}
