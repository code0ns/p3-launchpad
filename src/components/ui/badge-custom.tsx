
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "pro";
  className?: string;
}

export function BadgeCustom({ children, variant = "default", className }: BadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
        variant === "default" && "bg-black text-white",
        variant === "pro" && "bg-white text-black border border-black shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}
