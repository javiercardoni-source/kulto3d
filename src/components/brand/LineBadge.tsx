import { cn } from "@/lib/utils";
import { getLine } from "@/lib/brand";
import type { ProductLine } from "@/types/brand";

interface LineBadgeProps {
  line: ProductLine;
  className?: string;
  size?: "sm" | "md";
}

export function LineBadge({ line, className, size = "sm" }: LineBadgeProps) {
  const data = getLine(line);
  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-2 py-0.5"
      : "text-xs px-3 py-1";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium uppercase tracking-wider",
        sizeClasses,
        className,
      )}
      style={{
        borderColor: `color-mix(in oklch, var(${data.colorVar}) 40%, transparent)`,
        backgroundColor: `color-mix(in oklch, var(${data.colorVar}) 12%, transparent)`,
        color: `var(${data.colorVar})`,
      }}
    >
      <span aria-hidden>{data.emoji}</span>
      <span>{data.label}</span>
    </span>
  );
}
