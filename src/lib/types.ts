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
