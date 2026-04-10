import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Estudio de diseño + fabricación 3D`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "impresión 3D",
    "diseño 3D",
    "macetas 3D",
    "lámparas 3D",
    "cartelería 3D",
    "figuras 3D",
    "Argentina",
    "Kulto3D",
  ],
  authors: [{ name: "Kulto3D" }],
  creator: "Kulto3D",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Estudio de diseño + fabricación 3D`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Estudio de diseño + fabricación 3D`,
    description: SITE.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Kitchco shared widget: WhatsApp + agente IA */}
        <Script
          src="https://agents.kitchcocenter.com/public/widget.js?v=2"
          data-brand="kulto3d"
          data-color="#10b981"
          data-popup-delay="20"
          data-agent-name="Kulto"
          data-greeting="¡Hola! Soy el agente de Kulto3D. Contame qué estás buscando y te ayudo."
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
