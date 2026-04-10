import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sb = getAdminClient();
  if (!sb) {
    return NextResponse.json({ error: "DB unavailable" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!body.slug || !body.name || !body.line) {
    return NextResponse.json(
      { error: "Faltan campos: slug, name, line" },
      { status: 400 },
    );
  }

  const { data, error } = await sb
    .from("products")
    .insert(body)
    .select("id, slug")
    .single();

  if (error) {
    console.error("[admin/products POST]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id, slug: data.slug });
}
