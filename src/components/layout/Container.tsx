
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
  centerContent?: boolean;
}

export function Container({ 
  children, 
  className, 
  fullScreen = false, 
  centerContent = false 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        "w-full mx-auto px-4 sm:px-6 transition-all duration-300",
        fullScreen ? "min-h-screen max-w-full" : "max-w-5xl py-10 md:py-16",
        centerContent && "flex flex-col items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
