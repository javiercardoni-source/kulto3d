"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, MessageCircle } from "lucide-react";
import { STATUS_OPTIONS } from "@/components/admin/StatusBadge";
import type { OrderStatus } from "@/types";

interface OrderActionsProps {
  orderId: string;
  currentStatus: OrderStatus;
  customerPhone: string;
  orderCode: string;
}

export function OrderActions({
  orderId,
  currentStatus,
  customerPhone,
  orderCode,
}: OrderActionsProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al guardar");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSaving(false);
    }
  };

  const phoneClean = customerPhone.replace(/\D/g, "");
  const waMessage = encodeURIComponent(
    `¡Hola! Te escribo de Kulto3D por tu pedido ${orderCode}.`,
  );
  const waUrl = `https://wa.me/${phoneClean}?text=${waMessage}`;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
        Acciones
      </h2>

      <div className="mt-4 space-y-3">
        <label className="block text-xs text-zinc-400">
          Estado del pedido
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[color:var(--brand)] focus:outline-none"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || status === currentStatus}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Guardar cambios
        </button>

        {error && (
          <p className="text-xs text-red-300">{error}</p>
        )}

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25d366]/30 bg-[#25d366]/10 px-4 py-2.5 text-sm font-semibold text-[#25d366] transition-colors hover:bg-[#25d366]/20"
        >
          <MessageCircle className="h-4 w-4" />
          Escribir al cliente
        </a>
      </div>
    </section>
  );
}
