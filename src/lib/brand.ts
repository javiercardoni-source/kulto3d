import type { Line, ProductLine } from "@/types/brand";

export const LINES: readonly Line[] = [
  {
    id: "deco",
    slug: "decoracion",
    label: "Decoración y Hogar",
    emoji: "🌿",
    tagline: "Objetos que embellecen tu espacio",
    description:
      "Macetas, lámparas, organizadores y piezas decorativas diseñadas con estética moderna y carácter propio.",
    tone: "Emotivo + estético",
    colorVar: "--line-deco",
  },
  {
    id: "branding",
    slug: "branding",
    label: "Diseño Personalizado",
    emoji: "🎨",
    tagline: "Identidad física para tu marca",
    description:
      "Cartelería 3D, logos en relieve y señalética que hacen que tu negocio se vea tan profesional como lo merece.",
    tone: "Profesional + creativo",
    colorVar: "--line-branding",
  },
  {
    id: "construction",
    slug: "construccion",
    label: "Soluciones Funcionales",
    emoji: "🏗️",
    tagline: "Piezas que resuelven problemas reales",
    description:
      "Rejillas, componentes y piezas funcionales a medida. Ingeniería accesible con diseño cuidado.",
    tone: "Claro + funcional + confiable",
    colorVar: "--line-construction",
  },
  {
    id: "collectibles",
    slug: "coleccionables",
    label: "Creativos y Coleccionables",
    emoji: "🧠",
    tagline: "Objetos que cuentan una historia",
    description:
      "Figuras, fanart y ediciones especiales para los que ven los objetos como algo más que objetos.",
    tone: "Emocional + aspiracional",
    colorVar: "--line-collectibles",
  },
] as const;

export function getLine(id: ProductLine): Line {
  const line = LINES.find((l) => l.id === id);
  if (!line) throw new Error(`Unknown line: ${id}`);
  return line;
}

export const BRAND_PHRASES = [
  "Hecho con pasión en 3D",
  "De nuestras manos a tu espacio",
  "Diseño que nace desde cero",
  "Más que un objeto, una historia",
] as const;

export const BRAND_CENTRAL_MESSAGE =
  "Creamos objetos que combinan diseño, funcionalidad y esfuerzo real, desde productos para tu casa hasta soluciones para el mundo real.";
