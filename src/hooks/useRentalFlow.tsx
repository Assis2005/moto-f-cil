import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Moto } from "@/lib/types";
import { getMotos } from "@/lib/mock-api";

interface RentalFlowContextType {
  isOpen: boolean;
  selectedMoto: Moto | null;
  openRentalFlow: (moto?: Moto | null) => void;
  closeRentalFlow: () => void;
}

const RentalFlowContext = createContext<RentalFlowContextType | undefined>(undefined);

export function RentalFlowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);

  const openRentalFlow = useCallback((moto?: Moto | null) => {
    setSelectedMoto(moto ?? null);
    setIsOpen(true);
  }, []);

  const closeRentalFlow = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Suporte a abertura via query param ?alugar=id-da-moto ou ?alugar=true
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const alugarParam = urlParams.get("alugar");
      if (alugarParam) {
        const motos = getMotos();
        const motoEncontrada = motos.find((m) => m.id === alugarParam);
        setSelectedMoto(motoEncontrada ?? null);
        setIsOpen(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <RentalFlowContext.Provider
      value={{
        isOpen,
        selectedMoto,
        openRentalFlow,
        closeRentalFlow,
      }}
    >
      {children}
    </RentalFlowContext.Provider>
  );
}

export function useRentalFlow() {
  const context = useContext(RentalFlowContext);
  if (!context) {
    throw new Error("useRentalFlow deve ser usado dentro de um RentalFlowProvider");
  }
  return context;
}
