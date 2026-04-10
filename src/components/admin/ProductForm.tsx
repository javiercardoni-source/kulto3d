"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  AlertCircle,
  Save,
  Trash2,
  Upload,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { LINES } from "@/lib/brand";
import type { Product, ProductLine, ProductStatus } from "@/types";

interface ProductFormProps {
  product?: Product;
}

interface FormState {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  line: ProductLine;
  price: string;
  stock: string;
  status: ProductStatus;
  featured: boolean;
  materials: string;
  width: string;
  height: string;
  depth: string;
  leadTimeDays: string;
  images: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [form, setForm] = useState<FormState>({
    slug: product?.slug ?? "",
    name: product?.name ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    line: product?.line ?? "deco",
    price: product?.price?.toString() ?? "0",
    stock: product?.stock?.toString() ?? "0",
    status: product?.status ?? "draft",
    featured: product?.featured ?? false,
    materials: product?.materials?.join(", ") ?? "",
    width: product?.dimensions?.width?.toString() ?? "",
    height: product?.dimensions?.height?.toString() ?? "",
    depth: product?.dimensions?.depth?.toString() ?? "",
    leadTimeDays: product?.leadTimeDays?.toString() ?? "",
    images: product?.images ?? [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleNameChange = (value: string) => {
    setForm((f) => ({
      ...f,
      name: value,
      slug: !isEdit ? slugify(value) : f.slug,
    }));
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al subir imagen");
      setForm((f) => ({ ...f, images: [...f.images, data.url] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de upload");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      slug: form.slug,
      name: form.name,
      short_description: form.shortDescription,
      description: form.description,
      line: form.line,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      status: form.status,
      featured: form.featured,
      materials: form.materials
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      dimensions:
        form.width || form.height || form.depth
          ? {
              width: form.width ? Number(form.width) : undefined,
              height: form.height ? Number(form.height) : undefined,
              depth: form.depth ? Number(form.depth) : undefined,
              unit: "cm" as const,
            }
          : null,
      lead_time_days: form.leadTimeDays ? Number(form.leadTimeDays) : null,
      images: form.images,
    };

    try {
      const res = await fetch(
        isEdit
          ? `/api/admin/products/${product!.id}`
          : "/api/admin/products",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al guardar");

      router.push("/admin/productos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/products/${product!.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al eliminar");
      }
      router.push("/admin/productos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 py-10">
      <Link
        href="/admin/productos"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      <div className="mb-8 flex items-end justify-between">
        <h1 className="text-4xl font-bold text-white">
          {isEdit ? "Editar producto" : "Nuevo producto"}
        </h1>
        <div className="flex items-center gap-3">
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Guardar
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Basic */}
          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Información básica
            </legend>
            <div className="grid gap-4 pt-4">
              <Field label="Nombre" required>
                <Input
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </Field>
              <Field label="Slug (URL)" required>
                <Input
                  value={form.slug}
                  onChange={(e) =>
                    update("slug", slugify(e.target.value))
                  }
                  required
                />
              </Field>
              <Field label="Descripción corta">
                <Input
                  value={form.shortDescription}
                  onChange={(e) =>
                    update("shortDescription", e.target.value)
                  }
                  placeholder="Una línea que resuma el producto"
                />
              </Field>
              <Field label="Descripción larga">
                <Textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={6}
                  placeholder="Cuento completo del producto, con la onda Kulto3D..."
                />
              </Field>
            </div>
          </fieldset>

          {/* Images */}
          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Imágenes
            </legend>
            <div className="pt-4">
              {form.images.length > 0 && (
                <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {form.images.map((url, idx) => (
                    <div
                      key={url}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/80 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] py-10 transition-colors hover:border-white/30 hover:bg-white/[0.04]">
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-[color:var(--brand)]" />
                ) : (
                  <Upload className="h-6 w-6 text-zinc-500" />
                )}
                <span className="text-sm text-zinc-400">
                  {uploading
                    ? "Subiendo..."
                    : "Click para subir imagen (JPG, PNG, WebP)"}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </fieldset>

          {/* Specs */}
          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Especificaciones
            </legend>
            <div className="grid gap-4 pt-4 sm:grid-cols-4">
              <Field label="Materiales (separados por coma)" className="sm:col-span-4">
                <Input
                  value={form.materials}
                  onChange={(e) => update("materials", e.target.value)}
                  placeholder="PLA, PETG, Resina"
                />
              </Field>
              <Field label="Ancho (cm)">
                <Input
                  type="number"
                  value={form.width}
                  onChange={(e) => update("width", e.target.value)}
                />
              </Field>
              <Field label="Alto (cm)">
                <Input
                  type="number"
                  value={form.height}
                  onChange={(e) => update("height", e.target.value)}
                />
              </Field>
              <Field label="Profundidad (cm)">
                <Input
                  type="number"
                  value={form.depth}
                  onChange={(e) => update("depth", e.target.value)}
                />
              </Field>
              <Field label="Días producción">
                <Input
                  type="number"
                  value={form.leadTimeDays}
                  onChange={(e) => update("leadTimeDays", e.target.value)}
                  placeholder="Ej: 5"
                />
              </Field>
            </div>
          </fieldset>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-1">
          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Publicación
            </legend>
            <div className="space-y-4 pt-4">
              <Field label="Estado">
                <Select
                  value={form.status}
                  onChange={(e) =>
                    update("status", e.target.value as ProductStatus)
                  }
                >
                  <option value="draft">Borrador</option>
                  <option value="active">Activo (público)</option>
                  <option value="sold_out">Sin stock</option>
                  <option value="archived">Archivado</option>
                </Select>
              </Field>

              <Field label="Línea">
                <Select
                  value={form.line}
                  onChange={(e) =>
                    update("line", e.target.value as ProductLine)
                  }
                >
                  {LINES.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.emoji} {l.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <label className="flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => update("featured", e.target.checked)}
                  className="h-4 w-4 accent-[color:var(--brand)]"
                />
                Marcar como destacado
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Precio y stock
            </legend>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Field label="Precio (ARS)">
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="0 = consultar"
                />
              </Field>
              <Field label="Stock">
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) => update("stock", e.target.value)}
                />
              </Field>
            </div>
          </fieldset>
        </aside>
      </div>
    </form>
  );
}

// =========== Form primitives ===========

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs font-medium text-zinc-400">
        {label}
        {required && <span className="text-[color:var(--brand)]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[color:var(--brand)] focus:outline-none"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[color:var(--brand)] focus:outline-none"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[color:var(--brand)] focus:outline-none"
    />
  );
}
