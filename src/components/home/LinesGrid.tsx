import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LINES } from "@/lib/brand";

export function LinesGrid() {
  return (
    <section id="lineas" className="relative bg-zinc-950 py-24 text-white md:py-32">
      <Container>
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
            Lo que hacemos
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Cuatro líneas, <br />
            <span className="text-zinc-500">una sola identidad.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            Desde piezas que embellecen tu casa hasta soluciones funcionales
            para tu negocio. Todo sale de las mismas manos, con la misma pasión.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {LINES.map((line) => (
            <article
              key={line.id}
              id={`linea-${line.id}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.04] md:p-10"
            >
              {/* Accent glow */}
              <div
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: `var(${line.colorVar})` }}
              />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                    style={{
                      backgroundColor: `color-mix(in oklch, var(${line.colorVar}) 15%, transparent)`,
                      border: `1px solid color-mix(in oklch, var(${line.colorVar}) 30%, transparent)`,
                    }}
                  >
                    {line.emoji}
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-zinc-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>

                <h3
                  className="mt-6 text-2xl font-bold tracking-tight md:text-3xl"
                  style={{ color: `var(${line.colorVar})` }}
                >
                  {line.label}
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-300">
                  {line.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {line.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
