import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-tight", className)}>
      PLAS/TICK
    </span>
  );
}
