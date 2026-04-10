import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
        {children}
      </body>
    </html>
  );
}
