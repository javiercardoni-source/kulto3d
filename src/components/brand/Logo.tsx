import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showMark?: boolean;
}

export function Logo({ className, showMark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showMark && (
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M16 2 L16 16 L28 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <path
            d="M16 16 L16 30 M16 16 L4 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      )}
      <span className="font-semibold tracking-tight text-lg">
        Kulto<span className="text-[color:var(--brand)]">3D</span>
      </span>
    </div>
  );
}
