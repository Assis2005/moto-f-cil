import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useRentalFlow } from "@/hooks/useRentalFlow";

export function MobileCta() {
  const { openRentalFlow } = useRentalFlow();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={() => openRentalFlow()}
        className={cn(buttonVariants({ size: "lg" }), "w-full font-semibold shadow-lg")}
      >
        Quero alugar uma moto
      </button>
    </div>
  );
}

