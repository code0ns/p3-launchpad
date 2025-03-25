
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonCustomProps extends React.ComponentProps<typeof Button> {
  withArrow?: boolean;
}

export const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonCustomProps>(
  ({ className, children, withArrow = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "rounded-full px-6 py-6 h-auto text-base bg-black text-white border border-transparent",
          "hover:shadow-glow transition-all duration-300",
          "focus:shadow-glow focus:outline-none",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-2">
          {children}
          {withArrow && <ArrowRight className="h-4 w-4 ml-1" />}
        </span>
      </Button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";
