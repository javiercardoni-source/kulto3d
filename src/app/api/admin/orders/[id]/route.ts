import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import type { OrderStatus } from "@/types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const VALID_STATUSES: OrderStatus[] = [
  "pending",
  "paid",
  "in_production",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(request: Request, ctx: RouteContext) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  const sb = getAdminClient();
  if (!sb) {
    return NextResponse.json({ error: "DB unavailable" }, { status: 500 });
  }

  let body: { status?: OrderStatus; payment_ref?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  const { error } = await sb.from("orders").update(body).eq("id", id);

  if (error) {
    console.error("[admin/orders PATCH]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
