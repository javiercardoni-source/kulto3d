import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "Todavía no hay productos acá",
  description = "Estamos imprimiendo nuevos diseños. Volvé pronto o seguinos en Instagram para enterarte primero.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <PackageOpen className="h-7 w-7 text-[color:var(--brand)]" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">{description}</p>
    </div>
  );
}
