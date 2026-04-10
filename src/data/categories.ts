import type { Category } from "@/types";

/**
 * Static seed de categorías.
 * Reemplazado automáticamente por Supabase cuando las env vars están configuradas.
 */
export const CATEGORIES: Category[] = [
  // Deco
  {
    id: "cat-deco-macetas",
    slug: "macetas",
    line: "deco",
    name: "Macetas",
    description: "Macetas de diseño, autorriego, de pared y sets.",
    icon: "sprout",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },
  {
    id: "cat-deco-lamparas",
    slug: "lamparas",
    line: "deco",
    name: "Lámparas",
    description: "Luz con diseño propio.",
    icon: "lamp",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },
  {
    id: "cat-deco-organizadores",
    slug: "organizadores",
    line: "deco",
    name: "Organizadores",
    description: "Para ordenar con estilo.",
    icon: "box",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },

  // Branding
  {
    id: "cat-brand-carteleria",
    slug: "carteleria",
    line: "branding",
    name: "Cartelería",
    description: "Señalética e identidad física para tu negocio.",
    icon: "tag",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },
  {
    id: "cat-brand-logos",
    slug: "logos-relieve",
    line: "branding",
    name: "Logos en relieve",
    description: "Logos 3D que hablan por tu marca.",
    icon: "badge",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },

  // Construction
  {
    id: "cat-const-rejillas",
    slug: "rejillas",
    line: "construction",
    name: "Rejillas de ventilación",
    description: "Diseño cuidado que respira.",
    icon: "grid",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },
  {
    id: "cat-const-piezas",
    slug: "piezas-funcionales",
    line: "construction",
    name: "Piezas funcionales",
    description: "Componentes a medida para resolver problemas reales.",
    icon: "settings",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },

  // Collectibles
  {
    id: "cat-coll-figuras",
    slug: "figuras",
    line: "collectibles",
    name: "Figuras",
    description: "Arte, cultura y personajes en 3D.",
    icon: "star",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },
  {
    id: "cat-coll-ediciones",
    slug: "ediciones-especiales",
    line: "collectibles",
    name: "Ediciones especiales",
    description: "Piezas únicas, tiradas cortas.",
    icon: "gem",
    color: null,
    createdAt: "2026-04-10T00:00:00Z",
  },
];
