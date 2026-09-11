import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useRentalFlow } from "@/hooks/useRentalFlow";

export function CtaLink({
  to,
  children,
  variant = "default",
  size = "default",
  className,
  onClick,
}: {
  to?: string;
  children: ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  onClick?: () => void;
}) {
  const { openRentalFlow } = useRentalFlow();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    if (!to || to === "/cadastro") {
      e.preventDefault();
      openRentalFlow();
    }
  };

  if (onClick || !to || to === "/cadastro") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(buttonVariants({ variant, size }), "cursor-pointer", className)}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={to} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </a>
  );
}

