import { cn } from "@/lib/utils";
import { formatARS } from "@/lib/format";

interface PriceTagProps {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Price tag. When `value === 0` displays "Consultar" instead.
 */
export function PriceTag({ value, className, size = "md" }: PriceTagProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  }[size];

  if (value === 0) {
    return (
      <span className={cn("font-semibold text-[color:var(--brand)]", sizeClasses, className)}>
        Consultar
      </span>
    );
  }

  return (
    <span className={cn("font-bold text-white", sizeClasses, className)}>
      {formatARS(value)}
    </span>
  );
}
