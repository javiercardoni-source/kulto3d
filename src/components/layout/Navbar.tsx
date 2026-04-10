"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand/icons";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
  soon?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { href: "/productos", label: "Catálogo" },
  { href: "/#lineas", label: "Líneas" },
  { href: "/#nosotros", label: "Nosotros" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md supports-[backdrop-filter]:bg-black/50">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link href="/" className="text-white transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.soon ? "#" : link.href}
              className={cn(
                "text-sm text-zinc-300 transition-colors hover:text-white",
                link.soon && "cursor-not-allowed opacity-50",
              )}
              aria-disabled={link.soon}
              onClick={(e) => link.soon && e.preventDefault()}
            >
              {link.label}
              {link.soon && (
                <span className="ml-1 text-[9px] uppercase tracking-wider text-[color:var(--brand)]">
                  Pronto
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)] md:inline-flex"
          >
            <InstagramIcon className="h-3.5 w-3.5" />
            @{SITE.instagram.handle}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-black/90 backdrop-blur-md md:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.soon ? "#" : link.href}
                className={cn(
                  "text-base text-zinc-200 transition-colors hover:text-white",
                  link.soon && "opacity-50",
                )}
                onClick={(e) => {
                  if (link.soon) e.preventDefault();
                  else setOpen(false);
                }}
              >
                {link.label}
                {link.soon && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-[color:var(--brand)]">
                    Pronto
                  </span>
                )}
              </Link>
            ))}
            <Link
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white w-fit"
            >
              <InstagramIcon className="h-4 w-4" />
              @{SITE.instagram.handle}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
