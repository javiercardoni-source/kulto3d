/**
 * Cálculo de envío para Argentina.
 * V1: precios fijos por región. Después se puede conectar a Correo
 * Argentino / Andreani / OCA con su API real.
 */

export type ShippingRegion = "caba" | "amba" | "interior" | "patagonia";

export interface ShippingQuote {
  region: ShippingRegion;
  label: string;
  price: number;
  estimatedDays: string;
}

interface ProvinceData {
  region: ShippingRegion;
  label: string;
}

export const PROVINCES: Record<string, ProvinceData> = {
  CABA: { region: "caba", label: "Ciudad Autónoma de Buenos Aires" },
  "Buenos Aires": { region: "amba", label: "Buenos Aires" },
  Catamarca: { region: "interior", label: "Catamarca" },
  Chaco: { region: "interior", label: "Chaco" },
  Chubut: { region: "patagonia", label: "Chubut" },
  Córdoba: { region: "interior", label: "Córdoba" },
  Corrientes: { region: "interior", label: "Corrientes" },
  "Entre Ríos": { region: "interior", label: "Entre Ríos" },
  Formosa: { region: "interior", label: "Formosa" },
  Jujuy: { region: "interior", label: "Jujuy" },
  "La Pampa": { region: "interior", label: "La Pampa" },
  "La Rioja": { region: "interior", label: "La Rioja" },
  Mendoza: { region: "interior", label: "Mendoza" },
  Misiones: { region: "interior", label: "Misiones" },
  Neuquén: { region: "patagonia", label: "Neuquén" },
  "Río Negro": { region: "patagonia", label: "Río Negro" },
  Salta: { region: "interior", label: "Salta" },
  "San Juan": { region: "interior", label: "San Juan" },
  "San Luis": { region: "interior", label: "San Luis" },
  "Santa Cruz": { region: "patagonia", label: "Santa Cruz" },
  "Santa Fe": { region: "interior", label: "Santa Fe" },
  "Santiago del Estero": { region: "interior", label: "Santiago del Estero" },
  "Tierra del Fuego": { region: "patagonia", label: "Tierra del Fuego" },
  Tucumán: { region: "interior", label: "Tucumán" },
};

const REGION_PRICES: Record<ShippingRegion, ShippingQuote> = {
  caba: {
    region: "caba",
    label: "CABA",
    price: 2500,
    estimatedDays: "1 a 2 días hábiles",
  },
  amba: {
    region: "amba",
    label: "Buenos Aires (AMBA)",
    price: 3500,
    estimatedDays: "2 a 4 días hábiles",
  },
  interior: {
    region: "interior",
    label: "Interior del país",
    price: 5500,
    estimatedDays: "4 a 7 días hábiles",
  },
  patagonia: {
    region: "patagonia",
    label: "Patagonia",
    price: 7500,
    estimatedDays: "5 a 10 días hábiles",
  },
};

export function getShippingQuote(province: string): ShippingQuote | null {
  const data = PROVINCES[province];
  if (!data) return null;
  return REGION_PRICES[data.region];
}

export const PROVINCE_NAMES = Object.keys(PROVINCES).sort((a, b) =>
  a.localeCompare(b, "es"),
);
