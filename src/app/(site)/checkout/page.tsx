import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Completá tu pedido en Kulto3D",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="bg-zinc-950 py-12 md:py-20">
      <Container>
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            Checkout
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Finalizá tu pedido
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Datos, envío y forma de pago. Te respondemos por WhatsApp para
            coordinar todo.
          </p>
        </div>

        <CheckoutClient />
      </Container>
    </section>
  );
}
