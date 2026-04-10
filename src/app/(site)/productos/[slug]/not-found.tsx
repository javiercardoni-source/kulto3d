import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="bg-zinc-950 py-24 md:py-32">
      <Container className="text-center">
        <h1 className="text-5xl font-bold text-white md:text-7xl">404</h1>
        <p className="mt-4 text-lg text-zinc-400">
          No encontramos ese producto. Puede que ya lo hayamos archivado.
        </p>
        <Link
          href="/productos"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
        >
          Volver al catálogo
        </Link>
      </Container>
    </section>
  );
}
