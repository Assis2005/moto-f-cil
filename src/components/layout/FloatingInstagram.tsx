import React from "react";
import { Instagram } from "lucide-react";
import { EMPRESA_INSTAGRAM_URL, EMPRESA_INSTAGRAM_HANDLE } from "@/lib/constants";

export function FloatingInstagram() {
  return (
    <aside
      aria-label="Instagram da ViagemMot"
      className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <a
        href={EMPRESA_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Acompanhe novidades e frota no Instagram ${EMPRESA_INSTAGRAM_HANDLE}`}
        className="group relative flex items-center gap-2 rounded-full p-3 text-white shadow-[0_8px_25px_rgba(220,39,67,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(220,39,67,0.5)] active:scale-95 sm:px-4 sm:py-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]"
      >
        {/* Efeito de anel pulsante suave */}
        <span className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] opacity-60 blur-[6px] transition-all duration-300 group-hover:opacity-90" />

        {/* Ícone oficial Instagram */}
        <div className="grid size-6 place-items-center">
          <Instagram className="size-6 transition-transform duration-300 group-hover:rotate-6" strokeWidth={2.2} />
        </div>

        {/* Texto elegante visível em telas maiores e no hover */}
        <div className="hidden flex-col pr-1 text-left sm:flex">
          <span className="text-[10px] font-medium leading-none text-white/85 uppercase tracking-wider">
            Siga no Instagram
          </span>
          <span className="text-xs font-bold leading-tight text-white">
            {EMPRESA_INSTAGRAM_HANDLE}
          </span>
        </div>

        {/* Tooltip flutuante no mobile ao tocar/focar */}
        <span className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-lg bg-ink/90 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:hidden">
          {EMPRESA_INSTAGRAM_HANDLE}
        </span>
      </a>
    </aside>
  );
}
