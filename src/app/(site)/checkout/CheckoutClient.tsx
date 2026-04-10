"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatARS } from "@/lib/format";
import { getShippingQuote, PROVINCE_NAMES } from "@/lib/shipping";
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics";
import type { PaymentMethod } from "@/types";

interface FormState {
  name: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  apartment: string;
  city: string;
  province: string;
  zip: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

const PAYMENT_OPTIONS: Array<{
  value: PaymentMethod;
  label: string;
  description: string;
}> = [
  {
    value: "transfer",
    label: "Transferencia bancaria",
    description: "Te enviamos los datos por WhatsApp para que transfieras.",
  },
  {
    value: "whatsapp",
    label: "Coordinar por WhatsApp",
    description: "Te escribimos y arreglamos todo personalmente.",
  },
  {
    value: "cash",
    label: "Efectivo en mano",
    description: "Si nos cruzamos en CABA, lo arreglamos en persona.",
  },
];

export function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, hydrated, clear } = useCart();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    street: "",
    number: "",
    apartment: "",
    city: "",
    province: "",
    zip: "",
    notes: "",
    paymentMethod: "transfer",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect to cart if empty
  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, items.length, router]);

  // Track begin_checkout once when entering the page with items
  useEffect(() => {
    if (hydrated && items.length > 0) {
      trackBeginCheckout(items, subtotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const shipping = useMemo(
    () => (form.province ? getShippingQuote(form.province) : null),
    [form.province],
  );

  const total = subtotal + (shipping?.price ?? 0);

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value as FormState[K] }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    const required: Array<keyof FormState> = [
      "name",
      "email",
      "phone",
      "street",
      "number",
      "city",
      "province",
      "zip",
    ];
    for (const key of required) {
      if (!form[key]) {
        setError(`Falta completar: ${key}`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
          },
          shippingAddress: {
            street: form.street,
            number: form.number,
            apartment: form.apartment || undefined,
            city: form.city,
            province: form.province,
            zip: form.zip,
            notes: form.notes || undefined,
          },
          items: items.map((i) => ({
            productId: i.product.id,
            productSlug: i.product.slug,
            productName: i.product.name,
            unitPrice: i.product.price,
            quantity: i.quantity,
            image: i.product.images[0],
          })),
          subtotal,
          shippingCost: shipping?.price ?? 0,
          total,
          paymentMethod: form.paymentMethod,
          notes: form.notes || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Error al procesar el pedido");
      }

      // Track the purchase BEFORE clearing the cart (we need the items)
      trackPurchase(data.code, total, shipping?.price ?? 0, items);

      clear();
      router.push(`/checkout/success?code=${data.code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setSubmitting(false);
    }
  };

  if (!hydrated || items.length === 0) {
    return (
      <div className="h-96 animate-pulse rounded-2xl bg-white/[0.03]" />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3 lg:gap-10">
      {/* Form */}
      <div className="space-y-8 lg:col-span-2">
        {/* Customer */}
        <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            Tus datos
          </legend>
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <Field label="Nombre y apellido" required>
              <Input value={form.name} onChange={update("name")} required />
            </Field>
            <Field label="Email" required>
              <Input
                type="email"
                value={form.email}
                onChange={update("email")}
                required
              />
            </Field>
            <Field label="WhatsApp / Teléfono" required className="sm:col-span-2">
              <Input
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="+54 9 11 ..."
                required
              />
            </Field>
          </div>
        </fieldset>

        {/* Shipping */}
        <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            Envío
          </legend>
          <div className="grid gap-4 pt-4 sm:grid-cols-6">
            <Field label="Calle" required className="sm:col-span-4">
              <Input value={form.street} onChange={update("street")} required />
            </Field>
            <Field label="Número" required className="sm:col-span-1">
              <Input value={form.number} onChange={update("number")} required />
            </Field>
            <Field label="Depto" className="sm:col-span-1">
              <Input value={form.apartment} onChange={update("apartment")} />
            </Field>
            <Field label="Ciudad" required className="sm:col-span-3">
              <Input value={form.city} onChange={update("city")} required />
            </Field>
            <Field label="Provincia" required className="sm:col-span-2">
              <Select
                value={form.province}
                onChange={update("province")}
                required
              >
                <option value="">Elegí provincia</option>
                {PROVINCE_NAMES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="CP" required className="sm:col-span-1">
              <Input value={form.zip} onChange={update("zip")} required />
            </Field>
            <Field label="Notas (opcional)" className="sm:col-span-6">
              <Textarea
                value={form.notes}
                onChange={update("notes")}
                placeholder="Referencia, horario de entrega, etc."
                rows={2}
              />
            </Field>
          </div>
        </fieldset>

        {/* Payment */}
        <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            Forma de pago
          </legend>
          <div className="space-y-3 pt-4">
            {PAYMENT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                  form.paymentMethod === option.value
                    ? "border-[color:var(--brand)] bg-[color:var(--brand)]/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={form.paymentMethod === option.value}
                  onChange={update("paymentMethod")}
                  className="mt-1 h-4 w-4 accent-[color:var(--brand)]"
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {option.label}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
            <p className="pt-2 text-xs text-zinc-500">
              MercadoPago y tarjetas próximamente.
            </p>
          </div>
        </fieldset>
      </div>

      {/* Summary */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold text-white">Tu pedido</h2>

          <ul className="mt-4 space-y-3 border-b border-white/10 pb-4 text-sm">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-start justify-between gap-3 text-zinc-300"
              >
                <span className="flex-1">
                  {quantity}× {product.name}
                </span>
                <span className="text-white tabular-nums">
                  {formatARS(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <dt>Subtotal</dt>
              <dd className="text-white tabular-nums">{formatARS(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-zinc-400">
              <dt>Envío</dt>
              <dd className="tabular-nums">
                {shipping ? (
                  <span className="text-white">
                    {formatARS(shipping.price)}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-500">
                    Elegí provincia
                  </span>
                )}
              </dd>
            </div>
            {shipping && (
              <div className="text-xs text-zinc-500">
                {shipping.label} · {shipping.estimatedDays}
              </div>
            )}
          </dl>

          <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Total
            </span>
            <span className="text-2xl font-bold text-white tabular-nums">
              {formatARS(total)}
            </span>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              "Confirmar pedido"
            )}
          </button>

          <Link
            href="/cart"
            className="mt-3 block text-center text-xs text-zinc-500 transition-colors hover:text-white"
          >
            Volver al carrito
          </Link>
        </div>
      </aside>
    </form>
  );
}

// ============= Form primitives =============

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs font-medium text-zinc-400">
        {label}
        {required && <span className="text-[color:var(--brand)]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[color:var(--brand)] focus:outline-none"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[color:var(--brand)] focus:outline-none"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[color:var(--brand)] focus:outline-none"
    />
  );
}
