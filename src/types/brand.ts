export type ProductLine = "deco" | "branding" | "construction" | "collectibles";

export interface Line {
  id: ProductLine;
  slug: string;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  tone: string;
  colorVar: string; // CSS var name, e.g. "--line-deco"
}
