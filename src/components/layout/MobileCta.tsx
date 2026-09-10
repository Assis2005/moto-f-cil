import { Link } from "@tanstack/react-router";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/70 p-3 backdrop-blur-md md:hidden">
      <Link
        to="/cadastro"
        className="flex w-full items-center justify-center rounded-lg bg-accent-warm px-4 py-3 text-sm font-semibold text-ink"
      >
        Quero Alugar uma Moto
      </Link>
    </div>
  );
}
