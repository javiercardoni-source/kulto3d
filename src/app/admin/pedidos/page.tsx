import Link from "next/link";
import { getAdminClient } from "@/lib/supabase/admin";
import { mapOrderFromDB } from "@/lib/mappers";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatARS } from "@/lib/format";
import type { Order } from "@/types";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

async function getOrders(status?: string): Promise<Order[]> {
  const sb = getAdminClient();
  if (!sb) return [];

  let query = sb
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[admin/pedidos]", error);
    return [];
  }
  return (data ?? []).map(mapOrderFromDB);
}

const STATUS_FILTERS = [
  { value: undefined, label: "Todos" },
  { value: "pending", label: "Pendientes" },
  { value: "paid", label: "Pagados" },
  { value: "in_production", label: "En producción" },
  { value: "shipped", label: "Enviados" },
  { value: "delivered", label: "Entregados" },
];

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const orders = await getOrders(status);

  return (
    <div className="px-8 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Pedidos</h1>
        <p className="mt-2 text-sm text-zinc-400">
          {orders.length} pedido{orders.length !== 1 && "s"}
          {status && ` con estado "${status}"`}.
        </p>
      </div>

      {/* Status filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => {
          const isActive = (status ?? undefined) === filter.value;
          const href = filter.value
            ? `/admin/pedidos?status=${filter.value}`
            : "/admin/pedidos";
          return (
            <Link
              key={filter.label}
              href={href}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-16 text-center">
          <p className="text-zinc-400">No hay pedidos por ahora.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-left text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 font-medium">Código</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Pago</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => {
                const itemCount = order.items.reduce(
                  (acc, i) => acc + i.quantity,
                  0,
                );
                return (
                  <tr key={order.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/pedidos/${order.code}`}
                        className="font-mono text-xs text-white hover:text-[color:var(--brand)]"
                      >
                        {order.code}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white">{order.customer.name}</div>
                      <div className="text-xs text-zinc-500">
                        {order.customer.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{itemCount}</td>
                    <td className="px-4 py-3 text-xs text-zinc-400">
                      {order.paymentMethod}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-white tabular-nums">
                      {formatARS(order.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
