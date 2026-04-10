import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminClient } from "@/lib/supabase/admin";
import { mapOrderFromDB } from "@/lib/mappers";
import { formatARS } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrderActions } from "./OrderActions";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { code } = await params;
  const sb = getAdminClient();
  if (!sb) notFound();

  const { data, error } = await sb
    .from("orders")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (error || !data) notFound();

  const order = mapOrderFromDB(data);

  return (
    <div className="px-8 py-10">
      <Link
        href="/admin/pedidos"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a pedidos
      </Link>

      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-3xl font-bold text-white md:text-4xl">
              {order.code}
            </h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-2 text-sm text-zinc-400">
            Creado el{" "}
            {new Date(order.createdAt).toLocaleString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Items
            </h2>
            <ul className="mt-4 divide-y divide-white/5">
              {order.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <div className="text-sm font-medium text-white">
                      {item.quantity}× {item.productName}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {formatARS(item.unitPrice)} c/u
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-white tabular-nums">
                    {formatARS(item.unitPrice * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white tabular-nums">
                  {formatARS(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío</span>
                <span className="text-white tabular-nums">
                  {formatARS(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-semibold">
                <span className="text-white">Total</span>
                <span className="text-xl text-white tabular-nums">
                  {formatARS(order.total)}
                </span>
              </div>
            </div>
          </section>

          {order.notes && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
                Notas del cliente
              </h2>
              <p className="mt-3 text-sm text-zinc-300">{order.notes}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-1">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Cliente
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-zinc-500">Nombre</dt>
                <dd className="text-white">{order.customer.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Email</dt>
                <dd className="break-all text-white">{order.customer.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Teléfono</dt>
                <dd className="text-white">{order.customer.phone}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Envío
            </h2>
            <address className="mt-4 not-italic text-sm text-zinc-300">
              {order.shippingAddress.street} {order.shippingAddress.number}
              {order.shippingAddress.apartment &&
                `, ${order.shippingAddress.apartment}`}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.province}
              <br />
              CP {order.shippingAddress.zip}
            </address>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Pago
            </h2>
            <p className="mt-3 text-sm text-white capitalize">
              {order.paymentMethod}
            </p>
            {order.paymentRef && (
              <p className="mt-1 font-mono text-xs text-zinc-500">
                Ref: {order.paymentRef}
              </p>
            )}
          </section>

          <OrderActions
            orderId={order.id}
            currentStatus={order.status}
            customerPhone={order.customer.phone}
            orderCode={order.code}
          />
        </aside>
      </div>
    </div>
  );
}
