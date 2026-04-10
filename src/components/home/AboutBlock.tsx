import { Container } from "@/components/layout/Container";
import { BRAND_PHRASES } from "@/lib/brand";

export function AboutBlock() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-zinc-950 py-24 text-white md:py-32">
      {/* Subtle glow */}
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[color:var(--brand)]/10 blur-[140px]" />

      <Container className="relative z-10">
        <div className="grid gap-16 md:grid-cols-5 md:gap-20">
          <div className="md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Nosotros
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              De nuestras <br />
              manos a tu espacio.
            </h2>
          </div>

          <div className="md:col-span-3">
            <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
              <p>
                Kulto3D nació entre amigos. Empezamos con una impresora, muchas
                ideas y la convicción de que se podía crear algo con identidad
                propia desde cero.
              </p>
              <p>
                Hoy diseñamos y fabricamos piezas que combinan{" "}
                <span className="text-white">estética</span>,{" "}
                <span className="text-white">utilidad</span> y{" "}
                <span className="text-white">esfuerzo real</span>. Cada objeto
                sale de nuestras manos, con el mismo cuidado que tendríamos si
                fuera para nuestra propia casa.
              </p>
              <p className="text-zinc-400">
                No competimos por precio. Competimos por historia, diseño e
                identidad. Si elegís algo nuestro, estás apoyando a un proyecto
                que recién empieza.
              </p>
            </div>

            {/* Brand phrases */}
            <div className="mt-12 flex flex-wrap gap-2">
              {BRAND_PHRASES.map((phrase) => (
                <span
                  key={phrase}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-400 backdrop-blur"
                >
                  "{phrase}"
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
