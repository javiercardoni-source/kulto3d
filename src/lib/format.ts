/**
 * Format helpers for Kulto3D.
 */

const ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatARS(value: number): string {
  return ARS.format(value);
}

/**
 * Removes accents from a string for case-insensitive, accent-insensitive
 * search matching.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
