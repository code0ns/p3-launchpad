
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        transparent && !scrolled 
          ? "bg-transparent" 
          : "bg-white/80 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          P3 Starter
        </Link>
        <div className="flex items-center space-x-1">
          <Link 
            to="/dashboard" 
            className="px-4 py-2 rounded-full text-sm text-black hover:bg-black/5 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
