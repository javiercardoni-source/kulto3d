export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 text-white">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />

      <main className="relative z-10 flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Próximamente
        </span>

        <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-8xl">
          Kulto3D
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Estamos imprimiendo el futuro. Macetas, plantas y piezas únicas hechas con
          impresión 3D — diseñadas para los que ven la naturaleza con otros ojos.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
            🌱 Macetas
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
            🪴 Plantas
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
            🎨 Diseños únicos
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
            ⚡ Impresión 3D
          </div>
        </div>

        <p className="mt-16 text-xs uppercase tracking-widest text-zinc-600">
          www.kulto3d.com
        </p>
      </main>
    </div>
  );
}
