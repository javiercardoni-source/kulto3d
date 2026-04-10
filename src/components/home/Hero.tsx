import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { InstagramIcon } from "@/components/brand/icons";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[color:var(--brand)]/20 blur-[120px]" />
      <div className="absolute -left-40 bottom-0 -z-0 h-[400px] w-[400px] rounded-full bg-[color:var(--line-branding)]/15 blur-[120px]" />

      <Container as="div" className="relative z-10 flex flex-col items-start py-28 md:py-40">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-300 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--brand)]" />
          Estudio de diseño + fabricación 3D
        </span>

        <h1 className="max-w-4xl bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
          Transformamos ideas<br />
          en <span className="text-[color:var(--brand)]">objetos reales</span>.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          Somos un grupo de amigos que imprime en 3D con propósito. Diseñamos
          piezas únicas que mezclan estética, utilidad y mucho esfuerzo —
          desde decoración hasta soluciones reales.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/productos"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Ver el catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
          >
            <InstagramIcon className="h-4 w-4" />
            @{SITE.instagram.handle}
          </Link>
        </div>

        {/* Mini stats row */}
        <div className="mt-20 grid w-full grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {[
            { label: "Líneas de producto", value: "4" },
            { label: "Hecho a mano", value: "100%" },
            { label: "Diseño propio", value: "Siempre" },
            { label: "Historia", value: "Real" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
