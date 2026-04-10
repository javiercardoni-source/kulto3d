import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pedido confirmado",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { code } = await searchParams;
  const orderCode = code ?? "—";
  const hasWhatsApp = SITE.whatsapp.number.length > 0;

  const message = `¡Hola Kulto3D! Acabo de hacer un pedido. Mi número de orden es *${orderCode}*. ¿Cómo seguimos?`;

  return (
    <section className="bg-zinc-950 py-20 md:py-32">
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/5 p-8 text-center md:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--brand)]/15">
            <CheckCircle2 className="h-10 w-10 text-[color:var(--brand)]" />
          </div>

          <h1 className="text-4xl font-bold text-white md:text-5xl">
            ¡Pedido confirmado!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg text-zinc-300">
            Recibimos tu pedido y ya estamos preparándolo. Te vamos a escribir
            por WhatsApp para coordinar el pago y la entrega.
          </p>

          <div className="mt-8 inline-flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Número de pedido
            </span>
            <span className="font-mono text-lg font-bold text-white">
              {orderCode}
            </span>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {hasWhatsApp && (
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] sm:w-auto"
              >
                Escribirnos por WhatsApp
              </a>
            )}
            <Link
              href="/productos"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 sm:w-auto"
            >
              Seguir comprando
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-zinc-500">
          Imprimimos a pedido con todo el cuidado del mundo. Cualquier duda o
          cambio, mandanos un mensaje y lo resolvemos. Gracias por apoyar un
          proyecto que recién empieza. 💚
        </p>
      </Container>
    </section>
  );
}
