export const SITE = {
  name: "Kulto3D",
  shortName: "Kulto3D",
  url: "https://kulto3d.com",
  description:
    "Estudio de diseño y fabricación digital especializado en impresión 3D. Hecho con esfuerzo, diseño y mucha pasión.",
  tagline: "Diseño + impresión 3D, hecho con esfuerzo.",

  // Social
  instagram: {
    handle: "kulto3d",
    url: "https://www.instagram.com/kulto3d/",
  },

  // Contact
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    defaultMessage: "¡Hola Kulto3D! Me interesa conocer más sobre sus productos.",
  },

  // Founders
  founders: [
    { name: "Javier Cardoni", github: "javiercardoni" },
    { name: "Facu Laion", github: "FacuLaion" },
  ],
} as const;

export function whatsappLink(message?: string): string {
  const number = SITE.whatsapp.number.replace(/\D/g, "");
  const text = encodeURIComponent(message ?? SITE.whatsapp.defaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}
