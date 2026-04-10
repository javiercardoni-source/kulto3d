import type { ProductLine } from "./brand";

export interface Category {
  id: string;
  slug: string;
  name: string;
  line: ProductLine;
  description: string;
  icon: string | null;
  color: string | null;
  createdAt: string;
}
