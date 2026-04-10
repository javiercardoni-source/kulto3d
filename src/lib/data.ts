import { getServerClient } from "@/lib/supabase/server";
import { mapCategoryFromDB, mapProductFromDB } from "@/lib/mappers";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import type { Category, Product, ProductLine } from "@/types";

/**
 * Data layer con fallback automático.
 *
 * - Si Supabase está configurado → queries a la DB
 * - Si no → devuelve el seed estático de `/data/*.ts`
 *
 * Todas las funciones son `async` para permitir migración transparente.
 */

async function supabase() {
  return await getServerClient();
}

// -------------------- PRODUCTS --------------------

export async function getProducts(): Promise<Product[]> {
  const sb = await supabase();
  if (!sb) {
    return PRODUCTS.filter((p) => p.status === "active");
  }

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[kulto3d:data] getProducts error", error);
    return PRODUCTS.filter((p) => p.status === "active");
  }

  return (data ?? []).map(mapProductFromDB);
}

export async function getProductsByLine(line: ProductLine): Promise<Product[]> {
  const sb = await supabase();
  if (!sb) {
    return PRODUCTS.filter((p) => p.line === line && p.status === "active");
  }

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("line", line)
    .eq("status", "active")
    .order("featured", { ascending: false });

  if (error) {
    console.error("[kulto3d:data] getProductsByLine error", error);
    return PRODUCTS.filter((p) => p.line === line && p.status === "active");
  }

  return (data ?? []).map(mapProductFromDB);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sb = await supabase();
  if (!sb) {
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[kulto3d:data] getProductBySlug error", error);
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  return data ? mapProductFromDB(data) : null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const sb = await supabase();
  if (!sb) {
    return PRODUCTS.filter((p) => p.featured && p.status === "active").slice(
      0,
      limit,
    );
  }

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("featured", true)
    .eq("status", "active")
    .limit(limit);

  if (error) {
    console.error("[kulto3d:data] getFeaturedProducts error", error);
    return PRODUCTS.filter((p) => p.featured && p.status === "active").slice(
      0,
      limit,
    );
  }

  return (data ?? []).map(mapProductFromDB);
}

// -------------------- CATEGORIES --------------------

export async function getCategories(): Promise<Category[]> {
  const sb = await supabase();
  if (!sb) return CATEGORIES;

  const { data, error } = await sb
    .from("categories")
    .select("*")
    .order("line");

  if (error) {
    console.error("[kulto3d:data] getCategories error", error);
    return CATEGORIES;
  }

  return (data ?? []).map(mapCategoryFromDB);
}

export async function getCategoriesByLine(
  line: ProductLine,
): Promise<Category[]> {
  const sb = await supabase();
  if (!sb) return CATEGORIES.filter((c) => c.line === line);

  const { data, error } = await sb
    .from("categories")
    .select("*")
    .eq("line", line);

  if (error) {
    console.error("[kulto3d:data] getCategoriesByLine error", error);
    return CATEGORIES.filter((c) => c.line === line);
  }

  return (data ?? []).map(mapCategoryFromDB);
}
