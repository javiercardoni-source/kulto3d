import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { InstagramIcon } from "@/components/brand/icons";
import { SITE } from "@/lib/site";

export function InstagramCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white md:py-32">
      {/* Accent */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--brand)]/10 blur-[120px]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
            <InstagramIcon className="h-6 w-6 text-[color:var(--brand)]" />
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Mientras el catálogo llega,<br />
            <span className="text-zinc-500">seguinos en Instagram.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
            Ahí subimos nuestros nuevos diseños, el detrás de escena y las
            piezas que vamos terminando. Escribinos por DM si te gusta algo —
            te respondemos siempre.
          </p>

          <div className="mt-10">
            <Link
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--brand)] px-8 py-4 text-base font-semibold text-black transition-all hover:scale-105"
            >
              Ir a @{SITE.instagram.handle}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
