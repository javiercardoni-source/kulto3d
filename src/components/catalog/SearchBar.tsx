"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar productos...",
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-white/15 bg-white/5 transition-colors focus-within:border-[color:var(--brand)]",
        className,
      )}
    >
      <Search className="ml-4 h-4 w-4 text-zinc-500" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mr-3 text-zinc-500 transition-colors hover:text-white"
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
