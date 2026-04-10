import type { ProductLine } from "./brand";

export type ProductStatus = "draft" | "active" | "sold_out" | "archived";

export interface ProductDimensions {
  width?: number;
  height?: number;
  depth?: number;
  unit?: "cm" | "mm";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  line: ProductLine;
  categoryId: string | null;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
  status: ProductStatus;
  materials: string[];
  dimensions: ProductDimensions | null;
  leadTimeDays: number | null;
  createdAt: string;
  updatedAt: string;
}
