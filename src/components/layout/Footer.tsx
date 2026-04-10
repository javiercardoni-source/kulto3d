import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand/icons";
import { LINES } from "@/lib/brand";
import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-white">
            <Logo />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Estudio de diseño y fabricación digital. Creamos objetos que combinan
            diseño, funcionalidad y esfuerzo real.
          </p>
          <Link
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
          >
            <InstagramIcon className="h-4 w-4" />
            @{SITE.instagram.handle}
          </Link>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
            Líneas
          </h3>
          <ul className="space-y-3 text-sm">
            {LINES.map((line) => (
              <li key={line.id}>
                <Link
                  href={`/#linea-${line.id}`}
                  className="transition-colors hover:text-white"
                >
                  <span className="mr-2">{line.emoji}</span>
                  {line.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
            Proyecto
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/#nosotros" className="transition-colors hover:text-white">
                Quiénes somos
              </Link>
            </li>
            <li>
              <Link
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-zinc-500 sm:flex-row">
          <p>© {year} Kulto3D. Hecho con pasión en 3D.</p>
          <p className="font-mono tracking-wider">kulto3d.com</p>
        </Container>
      </div>
    </footer>
  );
}
