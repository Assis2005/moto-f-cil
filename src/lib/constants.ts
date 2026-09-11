import type { SolicitacaoStatus } from "./types";

export const EMPRESA_WHATSAPP_NUMERO = "5511999998888"; // Telefone de atendimento oficial
export const EMPRESA_NOME = "ViagemMot";
export const EMPRESA_INSTAGRAM_URL = "https://www.instagram.com/viagemmot";
export const EMPRESA_INSTAGRAM_HANDLE = "@viagemmot";


export const STATUS_CORES: Record<SolicitacaoStatus, { badge: string; border: string; bg: string }> = {
  "Nova": {
    badge: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    border: "border-blue-500",
    bg: "bg-blue-50/50",
  },
  "Em análise": {
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    border: "border-amber-500",
    bg: "bg-amber-50/50",
  },
  "Aguardando informações": {
    badge: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
    border: "border-purple-500",
    bg: "bg-purple-50/50",
  },
  "Proposta enviada": {
    badge: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
    border: "border-indigo-500",
    bg: "bg-indigo-50/50",
  },
  "Aprovada": {
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500",
    bg: "bg-emerald-50/50",
  },
  "Recusada": {
    badge: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
    border: "border-rose-500",
    bg: "bg-rose-50/50",
  },
  "Aluguel concluído": {
    badge: "bg-emerald-600/20 text-emerald-800 dark:text-emerald-200 border-emerald-600/40 font-bold",
    border: "border-emerald-600",
    bg: "bg-emerald-50/80",
  },
  "Cancelada": {
    badge: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-400 border-zinc-500/30",
    border: "border-zinc-500",
    bg: "bg-zinc-50/50",
  },
};

export const TODAS_STATUS: SolicitacaoStatus[] = [
  "Nova",
  "Em análise",
  "Aguardando informações",
  "Proposta enviada",
  "Aprovada",
  "Recusada",
  "Aluguel concluído",
  "Cancelada",
];

export function gerarLinkWhatsAppInteresse(modelo?: string): string {
  const texto = modelo
    ? `Olá! Tenho interesse em alugar a ${modelo}. Gostaria de saber disponibilidade, valores e condições para aluguel.`
    : `Olá! Tenho interesse em alugar uma moto com a ViagemMot. Gostaria de saber disponibilidade, valores e condições para aluguel.`;
  return `https://wa.me/${EMPRESA_WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export function gerarLinkWhatsAppProtocolo(protocolo: string, modelo: string): string {
  const texto = `Olá! Acabei de enviar a solicitação #${protocolo} para alugar a moto ${modelo} e gostaria de falar com um atendente.`;
  return `https://wa.me/${EMPRESA_WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export function gerarLinkWhatsAppPropostaAdmin(clienteWhatsapp: string, clienteNome: string, modelo: string, protocolo: string): string {
  const cleanPhone = clienteWhatsapp.replace(/\D/g, "");
  const ddi = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
  const texto = `Olá ${clienteNome}! Sou da equipe ViagemMot referente à sua solicitação #${protocolo} para a ${modelo}. Analisamos seu cadastro e temos uma proposta especial para você!`;
  return `https://wa.me/${ddi}?text=${encodeURIComponent(texto)}`;
}
