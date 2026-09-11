export type MotoStatus = "disponivel" | "reservada" | "ultima_unidade" | "indisponivel";

export interface Moto {
  id: string;
  modelo: string;
  ano: number;
  cilindrada: string;
  valorSemanal: number;
  valorMensal: number;
  status: MotoStatus;
}

export interface Plano {
  id: string;
  nome: string;
  preco: number;
  periodo: string;
  destaque: boolean;
  selo?: string;
  inclusos: string[];
}

export interface Beneficio {
  numero: string;
  titulo: string;
  descricao: string;
}

export interface Passo {
  numero: string;
  titulo: string;
  descricao: string;
}

export interface FaqItem {
  pergunta: string;
  resposta: string;
}

export type CadastroStatus = "pendente" | "aprovado" | "reprovado";

export interface Cadastro {
  id: string;
  nome: string;
  cpf: string;
  data: string;
  status: CadastroStatus;
}

export interface CadastroPayload {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  cep: string;
  cidade: string;
  estado: string;
  tempoEntregador: string;
  aplicativos: string[];
  rendaMensal: string;
  documentos: {
    cnh?: string;
    selfie?: string;
    comprovanteResidencia?: string;
  };
}

export type SolicitacaoStatus =
  | "Nova"
  | "Em análise"
  | "Aguardando informações"
  | "Proposta enviada"
  | "Aprovada"
  | "Recusada"
  | "Aluguel concluído"
  | "Cancelada";

export interface HistoricoAlteracao {
  id: string;
  data: string;
  descricao: string;
  autor?: string | undefined;
}

export interface SolicitacaoAluguel {
  id: string; // Ex: SOL-84920
  dataCriacao: string;
  status: SolicitacaoStatus;
  
  // Etapa 1 — Informações básicas
  nome: string;
  whatsapp: string;
  email: string;
  cidadeUf: string;

  // Etapa 2 — Informações do aluguel
  motoId?: string | undefined;
  motoModelo: string;
  dataRetirada: string;
  periodo: string;
  finalidade: string;
  observacoes?: string | undefined;

  // Etapa 3 — Perfil do interessado
  possuiCnhA: string;
  tempoHabilitacao: string;
  faixaEtaria: string;
  cidadeUso: string;
  experienciaEntregas?: string | undefined;

  // Painel Administrativo
  observacoesInternas?: string | undefined;
  historico: HistoricoAlteracao[];
}

export type SolicitacaoPayload = Omit<SolicitacaoAluguel, "id" | "dataCriacao" | "status" | "historico" | "observacoesInternas">;


