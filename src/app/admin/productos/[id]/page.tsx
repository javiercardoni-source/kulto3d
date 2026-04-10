import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminClient } from "@/lib/supabase/admin";
import { mapProductFromDB } from "@/lib/mappers";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const sb = getAdminClient();

  if (!sb) notFound();

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const product = mapProductFromDB(data);

  return <ProductForm product={product} />;
}
