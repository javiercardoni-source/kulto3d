import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  in_production: "En producción",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  paid: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  in_production:
    "border-violet-500/30 bg-violet-500/10 text-violet-300",
  shipped: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  delivered:
    "border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 text-[color:var(--brand)]",
  cancelled: "border-red-500/30 bg-red-500/10 text-red-300",
};

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        STATUS_STYLES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export const STATUS_OPTIONS: Array<{ value: OrderStatus; label: string }> =
  Object.entries(STATUS_LABELS).map(([value, label]) => ({
    value: value as OrderStatus,
    label,
  }));
