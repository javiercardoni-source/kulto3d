"use client";

import { cn } from "@/lib/utils";
import { LINES } from "@/lib/brand";
import type { ProductLine } from "@/types";

interface LineFilterProps {
  active: ProductLine | "all";
  onChange: (line: ProductLine | "all") => void;
  counts?: Record<string, number>;
}

export function LineFilter({ active, onChange, counts }: LineFilterProps) {
  const total = counts
    ? Object.values(counts).reduce((acc, n) => acc + n, 0)
    : undefined;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
          active === "all"
            ? "border-white bg-white text-black"
            : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white",
        )}
      >
        Todo
        {total !== undefined && (
          <span className="text-xs opacity-60">({total})</span>
        )}
      </button>

      {LINES.map((line) => {
        const isActive = active === line.id;
        const count = counts?.[line.id];
        return (
          <button
            key={line.id}
            type="button"
            onClick={() => onChange(line.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
              isActive
                ? "text-black"
                : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white",
            )}
            style={
              isActive
                ? {
                    backgroundColor: `var(${line.colorVar})`,
                    borderColor: `var(${line.colorVar})`,
                  }
                : undefined
            }
          >
            <span>{line.emoji}</span>
            <span>{line.label}</span>
            {count !== undefined && (
              <span className="text-xs opacity-60">({count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
