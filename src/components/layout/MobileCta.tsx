import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <a href="/cadastro" className={cn(buttonVariants({ size: "lg" }), "w-full font-semibold")}>
        Quero alugar uma moto
      </a>
    </div>
  );
}
