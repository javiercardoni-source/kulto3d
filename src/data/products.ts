import type { Product } from "@/types";

/**
 * Static seed de productos placeholder.
 * Usados como fallback cuando Supabase no está configurado.
 * Cuando Javi pase fotos reales, reemplazar las URLs de `images`.
 */
const now = "2026-04-10T00:00:00Z";

export const PRODUCTS: Product[] = [
  // ========== 🌿 DECO ==========
  {
    id: "prod-maceta-torre",
    slug: "maceta-torre",
    name: "Maceta Torre",
    line: "deco",
    categoryId: "cat-deco-macetas",
    shortDescription: "Maceta de diseño vertical con líneas limpias.",
    description:
      "Una maceta pensada para espacios pequeños que no resignan estilo. Diseñada desde cero con un patrón geométrico que juega con la luz y la sombra. Perfecta para suculentas, cactus y plantas que aman el drenaje.",
    price: 8500,
    stock: 12,
    images: ["/placeholder-product.svg"],
    featured: true,
    status: "active",
    materials: ["PLA ecológico"],
    dimensions: { width: 10, height: 18, depth: 10, unit: "cm" },
    leadTimeDays: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "prod-lampara-colmena",
    slug: "lampara-colmena",
    name: "Lámpara Colmena",
    line: "deco",
    categoryId: "cat-deco-lamparas",
    shortDescription: "Luz cálida filtrada por un patrón hexagonal.",
    description:
      "Una lámpara que no es solo luz: es atmósfera. El patrón de colmena genera sombras suaves y hace que la luz parezca respirar. Ideal para mesitas de luz, escritorios o cualquier rincón que pida calidez.",
    price: 15500,
    stock: 6,
    images: ["/placeholder-product.svg"],
    featured: true,
    status: "active",
    materials: ["PLA translúcido", "LED cálido incluido"],
    dimensions: { width: 15, height: 22, depth: 15, unit: "cm" },
    leadTimeDays: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "prod-organizador-escritorio",
    slug: "organizador-escritorio",
    name: "Organizador de Escritorio",
    line: "deco",
    categoryId: "cat-deco-organizadores",
    shortDescription: "Modular, limpio, funcional.",
    description:
      "Un organizador que se adapta a tu desorden. Compartimentos pensados para lapiceras, auriculares, cables y todo eso que siempre termina tirado. Diseño modular para que lo armes como necesites.",
    price: 6200,
    stock: 20,
    images: ["/placeholder-product.svg"],
    featured: false,
    status: "active",
    materials: ["PLA mate"],
    dimensions: { width: 25, height: 10, depth: 15, unit: "cm" },
    leadTimeDays: 2,
    createdAt: now,
    updatedAt: now,
  },

  // ========== 🎨 BRANDING ==========
  {
    id: "prod-logo-relieve-personalizado",
    slug: "logo-relieve-personalizado",
    name: "Logo en Relieve Personalizado",
    line: "branding",
    categoryId: "cat-brand-logos",
    shortDescription: "Tu logo en 3D, listo para colgar.",
    description:
      "Transformamos el logo de tu marca en una pieza física con presencia. Ideal para recepciones, oficinas, locales o como regalo corporativo. Elegís el tamaño, nosotros nos encargamos del diseño y la impresión.",
    price: 22000,
    stock: 0,
    images: ["/placeholder-product.svg"],
    featured: true,
    status: "active",
    materials: ["PLA Premium", "PETG opcional"],
    dimensions: null,
    leadTimeDays: 7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "prod-cartel-numero-local",
    slug: "cartel-numero-local",
    name: "Cartel de Número para Local",
    line: "branding",
    categoryId: "cat-brand-carteleria",
    shortDescription: "Números 3D con diseño que no pasa desapercibido.",
    description:
      "Tu número de local, pero con onda. Diseños modernos, tipografías cuidadas y acabado profesional. Hecho para que tu negocio se vea tan bien como lo que ofrece.",
    price: 9800,
    stock: 0,
    images: ["/placeholder-product.svg"],
    featured: false,
    status: "active",
    materials: ["PLA Premium"],
    dimensions: { width: 20, height: 30, depth: 2, unit: "cm" },
    leadTimeDays: 5,
    createdAt: now,
    updatedAt: now,
  },

  // ========== 🏗️ CONSTRUCTION ==========
  {
    id: "prod-rejilla-ventilacion-150",
    slug: "rejilla-ventilacion-150",
    name: "Rejilla de Ventilación 150mm",
    line: "construction",
    categoryId: "cat-const-rejillas",
    shortDescription:
      "Rejilla estándar 150mm con diseño cuidado.",
    description:
      "Reemplazá esa rejilla fea que vino con la casa. Medidas estándar para que entre sin modificaciones, pero con un diseño que suma a tu ambiente. Resistente, fácil de instalar, pensada para durar.",
    price: 4500,
    stock: 30,
    images: ["/placeholder-product.svg"],
    featured: false,
    status: "active",
    materials: ["PETG", "ABS resistente al calor"],
    dimensions: { width: 15, height: 15, depth: 2, unit: "cm" },
    leadTimeDays: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "prod-pieza-a-medida",
    slug: "pieza-a-medida",
    name: "Pieza Funcional a Medida",
    line: "construction",
    categoryId: "cat-const-piezas",
    shortDescription:
      "Contanos qué necesitás y lo fabricamos.",
    description:
      "¿Se te rompió una pieza imposible de conseguir? ¿Necesitás algo que no existe en el mercado? Lo diseñamos y lo imprimimos. Mandanos las medidas, una foto o un boceto y coordinamos todo por WhatsApp.",
    price: 0,
    stock: 0,
    images: ["/placeholder-product.svg"],
    featured: true,
    status: "active",
    materials: ["Según requerimiento"],
    dimensions: null,
    leadTimeDays: null,
    createdAt: now,
    updatedAt: now,
  },

  // ========== 🧠 COLLECTIBLES ==========
  {
    id: "prod-figura-coleccionable-serie-1",
    slug: "figura-coleccionable-serie-1",
    name: "Figura Coleccionable — Serie 1",
    line: "collectibles",
    categoryId: "cat-coll-figuras",
    shortDescription:
      "Edición limitada, diseño original.",
    description:
      "Una pieza única de nuestra primera serie de coleccionables. Diseño original de Kulto3D, impreso con el máximo cuidado en los detalles. Numerada y firmada en la base — porque cuando salga de nuestras manos, va a ser parte de una historia.",
    price: 12500,
    stock: 8,
    images: ["/placeholder-product.svg"],
    featured: true,
    status: "active",
    materials: ["Resina de alta definición"],
    dimensions: { width: 8, height: 15, depth: 8, unit: "cm" },
    leadTimeDays: 10,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "prod-edicion-especial-cultura",
    slug: "edicion-especial-cultura",
    name: "Edición Especial — Cultura Pop",
    line: "collectibles",
    categoryId: "cat-coll-ediciones",
    shortDescription:
      "Objetos para los que entienden.",
    description:
      "Ediciones especiales inspiradas en la cultura que nos formó. Tirada corta, hecha a medida, para los que saben apreciar el detalle. Consultá por disponibilidad — cuando se terminan, no vuelven.",
    price: 18000,
    stock: 3,
    images: ["/placeholder-product.svg"],
    featured: false,
    status: "active",
    materials: ["PLA mate", "Resina opcional"],
    dimensions: null,
    leadTimeDays: 14,
    createdAt: now,
    updatedAt: now,
  },
];
