import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function CtaLink({
  to,
  children,
  variant = "default",
  size = "default",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  return (
    <a href={to} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </a>
  );
}
