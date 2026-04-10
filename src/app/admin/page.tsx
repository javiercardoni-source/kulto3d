import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { getAdminClient } from "@/lib/supabase/admin";
import { formatARS } from "@/lib/format";

export const dynamic = "force-dynamic";

interface Stats {
  productsTotal: number;
  productsActive: number;
  ordersTotal: number;
  ordersPending: number;
  revenueTotal: number;
  recentOrders: Array<{
    code: string;
    customer: string;
    total: number;
    status: string;
    created_at: string;
  }>;
}

async function getStats(): Promise<Stats> {
  const sb = getAdminClient();
  if (!sb) {
    return {
      productsTotal: 0,
      productsActive: 0,
      ordersTotal: 0,
      ordersPending: 0,
      revenueTotal: 0,
      recentOrders: [],
    };
  }

  const [
    { count: productsTotal },
    { count: productsActive },
    { count: ordersTotal },
    { count: ordersPending },
    { data: paidOrders },
    { data: recent },
  ] = await Promise.all([
    sb.from("products").select("*", { count: "exact", head: true }),
    sb
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    sb.from("orders").select("*", { count: "exact", head: true }),
    sb
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    sb.from("orders").select("total").in("status", ["paid", "in_production", "shipped", "delivered"]),
    sb
      .from("orders")
      .select("code, customer, total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const revenueTotal =
    paidOrders?.reduce((acc, o) => acc + Number(o.total ?? 0), 0) ?? 0;

  return {
    productsTotal: productsTotal ?? 0,
    productsActive: productsActive ?? 0,
    ordersTotal: ordersTotal ?? 0,
    ordersPending: ordersPending ?? 0,
    revenueTotal,
    recentOrders:
      recent?.map((o) => ({
        code: o.code,
        customer:
          (o.customer as { name?: string })?.name ?? "Sin nombre",
        total: Number(o.total),
        status: o.status,
        created_at: o.created_at,
      })) ?? [],
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Productos activos",
      value: `${stats.productsActive}/${stats.productsTotal}`,
      icon: Package,
      href: "/admin/productos",
      color: "var(--line-deco)",
    },
    {
      label: "Pedidos totales",
      value: stats.ordersTotal,
      icon: ShoppingBag,
      href: "/admin/pedidos",
      color: "var(--line-branding)",
    },
    {
      label: "Pendientes",
      value: stats.ordersPending,
      icon: Clock,
      href: "/admin/pedidos?status=pending",
      color: "var(--line-collectibles)",
    },
    {
      label: "Facturado",
      value: formatARS(stats.revenueTotal),
      icon: TrendingUp,
      href: "/admin/pedidos",
      color: "var(--brand)",
    },
  ];

  return (
    <div className="px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Resumen de la operación de Kulto3D.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${card.color} 15%, transparent)`,
                    border: `1px solid color-mix(in oklch, ${card.color} 30%, transparent)`,
                  }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: card.color }}
                  />
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold text-white tabular-nums">
                  {card.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                  {card.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent orders */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Pedidos recientes
          </h2>
          <Link
            href="/admin/pedidos"
            className="text-xs text-zinc-400 transition-colors hover:text-white"
          >
            Ver todos →
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            Todavía no hay pedidos. Cuando lleguen, los vas a ver acá.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-zinc-500">
                  <th className="pb-3 font-medium">Código</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentOrders.map((order) => (
                  <tr key={order.code}>
                    <td className="py-3 font-mono text-xs text-white">
                      <Link
                        href={`/admin/pedidos/${order.code}`}
                        className="hover:text-[color:var(--brand)]"
                      >
                        {order.code}
                      </Link>
                    </td>
                    <td className="py-3 text-zinc-300">{order.customer}</td>
                    <td className="py-3">
                      <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-300">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold text-white tabular-nums">
                      {formatARS(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
