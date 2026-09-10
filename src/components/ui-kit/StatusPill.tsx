import type { CadastroStatus, MotoStatus } from "@/lib/types";

const motoLabels: Record<MotoStatus, string> = {
  disponivel: "Disponível",
  reservada: "Reservada",
  ultima_unidade: "Última unidade",
  indisponivel: "Indisponível",
};

const motoTone: Record<MotoStatus, string> = {
  disponivel: "bg-success-soft text-success",
  reservada: "bg-warning-soft text-warning",
  ultima_unidade: "bg-warning-soft text-warning",
  indisponivel: "bg-danger-soft text-danger",
};

const cadastroLabels: Record<CadastroStatus, string> = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  reprovado: "Reprovado",
};

const cadastroTone: Record<CadastroStatus, string> = {
  pendente: "bg-warning-soft text-warning",
  aprovado: "bg-success-soft text-success",
  reprovado: "bg-danger-soft text-danger",
};

export function MotoStatusPill({ status }: { status: MotoStatus }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${motoTone[status]}`}
    >
      {motoLabels[status]}
    </span>
  );
}

export function CadastroStatusPill({ status }: { status: CadastroStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${cadastroTone[status]}`}>
      {cadastroLabels[status]}
    </span>
  );
}
