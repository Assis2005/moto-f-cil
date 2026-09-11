/**
 * Camada de dados mockada (sem banco de dados).
 *
 * Todas as telas consomem apenas estas funções. Para integrar com uma API real
 * no futuro, basta trocar o corpo de cada função por uma chamada HTTP / server
 * function — as assinaturas e os tipos permanecem os mesmos.
 */
import motosJson from "@/data/motos.json";
import planosJson from "@/data/planos.json";
import beneficiosJson from "@/data/beneficios.json";
import comoFuncionaJson from "@/data/como-funciona.json";
import faqJson from "@/data/faq.json";
import cadastrosJson from "@/data/cadastros.json";
import type {
  Beneficio,
  Cadastro,
  CadastroPayload,
  FaqItem,
  HistoricoAlteracao,
  Moto,
  Passo,
  Plano,
  SolicitacaoAluguel,
  SolicitacaoPayload,
  SolicitacaoStatus,
} from "./types";

const STORAGE_CADASTROS_KEY = "viagemmot:cadastros";
const STORAGE_SOLICITACOES_KEY = "viagemmot:solicitacoes";

export const getMotos = (): Moto[] => motosJson as Moto[];

export const getMotosDestaque = (): Moto[] => getMotos().slice(0, 3);

export const getPlanos = (): Plano[] => planosJson as Plano[];

export const getBeneficios = (): Beneficio[] => beneficiosJson as Beneficio[];

export const getComoFunciona = (): Passo[] => comoFuncionaJson as Passo[];

export const getFaq = (): FaqItem[] => faqJson as FaqItem[];

const getCadastrosLocais = (): Cadastro[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_CADASTROS_KEY);
    return raw ? (JSON.parse(raw) as Cadastro[]) : [];
  } catch {
    return [];
  }
};

export const getCadastros = (): Cadastro[] => [
  ...getCadastrosLocais(),
  ...(cadastrosJson as Cadastro[]),
];

export const criarCadastro = (payload: CadastroPayload): Cadastro => {
  const novo: Cadastro = {
    id: `c-${Date.now()}`,
    nome: payload.nome,
    cpf: payload.cpf,
    data: new Date().toISOString().slice(0, 10),
    status: "pendente",
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_CADASTROS_KEY, JSON.stringify([novo, ...getCadastrosLocais()]));
    } catch {
      /* armazenamento indisponível */
    }
  }
  return novo;
};

// Seed de solicitações de aluguel para o painel administrativo
const SEED_SOLICITACOES: SolicitacaoAluguel[] = [
  {
    id: "SOL-91823",
    dataCriacao: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: "Nova",
    nome: "Marcos Vinicius Ribeiro",
    whatsapp: "(11) 98765-4321",
    email: "marcos.v@email.com",
    cidadeUf: "São Paulo / SP",
    motoId: "cg-160",
    motoModelo: "Honda CG 160",
    dataRetirada: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    periodo: "Semanal",
    finalidade: "Entregas por aplicativo (iFood e Rappi)",
    observacoes: "Já tenho baú e capacete próprios. Gostaria de retirar de manhã.",
    possuiCnhA: "Sim, CNH definitiva",
    tempoHabilitacao: "3 a 5 anos",
    faixaEtaria: "25 a 34 anos",
    cidadeUso: "São Paulo e Grande SP",
    experienciaEntregas: "Sim, trabalho com entregas há 2 anos",
    historico: [
      {
        id: "h-1",
        data: new Date(Date.now() - 3600000 * 3).toISOString(),
        descricao: "Solicitação criada pelo interessado através do formulário rápido",
      },
    ],
  },
  {
    id: "SOL-91820",
    dataCriacao: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: "Em análise",
    nome: "Amanda Silveira Costa",
    whatsapp: "(11) 99123-8877",
    email: "amanda.costa@email.com",
    cidadeUf: "Guarulhos / SP",
    motoId: "fazer-250",
    motoModelo: "Yamaha Fazer 250",
    dataRetirada: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
    periodo: "Mensal",
    finalidade: "Locomoção pessoal e trabalho",
    observacoes: "Prefiro moto na cor preta ou azul escura.",
    possuiCnhA: "Sim, CNH definitiva",
    tempoHabilitacao: "Mais de 5 anos",
    faixaEtaria: "35 a 49 anos",
    cidadeUso: "Guarulhos e Capital",
    experienciaEntregas: "Não, uso pessoal",
    observacoesInternas: "Score consultado: positivo. Verificando disponibilidade no pátio.",
    historico: [
      {
        id: "h-2",
        data: new Date(Date.now() - 3600000 * 18).toISOString(),
        descricao: "Solicitação recebida",
      },
      {
        id: "h-3",
        data: new Date(Date.now() - 3600000 * 12).toISOString(),
        descricao: "Status alterado para 'Em análise' pela equipe operacional",
        autor: "Equipe ViagemMot",
      },
    ],
  },
  {
    id: "SOL-91815",
    dataCriacao: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    status: "Proposta enviada",
    nome: "Rodrigo Pires Alencar",
    whatsapp: "(11) 97654-3210",
    email: "rodrigo.pires@email.com",
    cidadeUf: "Osasco / SP",
    motoId: "xre-190",
    motoModelo: "Honda XRE 190",
    dataRetirada: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    periodo: "Quinzenal",
    finalidade: "Entregas por aplicativo",
    possuiCnhA: "Sim, CNH definitiva",
    tempoHabilitacao: "1 a 2 anos",
    faixaEtaria: "25 a 34 anos",
    cidadeUso: "Osasco e Zona Oeste de SP",
    experienciaEntregas: "Sim, Mercado Livre e Loggi",
    observacoesInternas: "Proposta de R$ 159/semana enviada pelo WhatsApp. Aguardando confirmação do cliente.",
    historico: [
      {
        id: "h-4",
        data: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        descricao: "Solicitação criada",
      },
      {
        id: "h-5",
        data: new Date(Date.now() - 86400000).toISOString(),
        descricao: "Proposta comercial enviada via WhatsApp",
        autor: "Atendente Comercial",
      },
    ],
  },
  {
    id: "SOL-91810",
    dataCriacao: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: "Aprovada",
    nome: "Lucas Santana Ferraz",
    whatsapp: "(11) 98234-5678",
    email: "lucas.santana@email.com",
    cidadeUf: "São Bernardo do Campo / SP",
    motoId: "factor-150",
    motoModelo: "Yamaha Factor 150",
    dataRetirada: new Date().toISOString().slice(0, 10),
    periodo: "Mensal",
    finalidade: "Entregas por aplicativo (iFood)",
    possuiCnhA: "Sim, CNH definitiva",
    tempoHabilitacao: "3 a 5 anos",
    faixaEtaria: "25 a 34 anos",
    cidadeUso: "ABC Paulista e SP Capital",
    experienciaEntregas: "Sim, entregador profissional",
    observacoesInternas: "Contrato digital assinado. Agendada retirada hoje às 15h.",
    historico: [
      {
        id: "h-6",
        data: new Date(Date.now() - 86400000 * 3).toISOString(),
        descricao: "Solicitação recebida",
      },
      {
        id: "h-7",
        data: new Date(Date.now() - 86400000 * 2).toISOString(),
        descricao: "Perfil aprovado e contrato gerado",
        autor: "Gerência",
      },
    ],
  },
  {
    id: "SOL-91801",
    dataCriacao: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: "Aluguel concluído",
    nome: "Felipe Barbosa Santos",
    whatsapp: "(11) 99444-2211",
    email: "felipe.santos@email.com",
    cidadeUf: "São Paulo / SP",
    motoId: "biz-125",
    motoModelo: "Honda Biz 125",
    dataRetirada: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
    periodo: "Mensal",
    finalidade: "Entregas urbanas",
    possuiCnhA: "Sim, CNH definitiva",
    tempoHabilitacao: "Mais de 5 anos",
    faixaEtaria: "35 a 49 anos",
    cidadeUso: "São Paulo / SP",
    observacoesInternas: "Moto entregue com sucesso, placa FTR-4E21. Cliente rodando normalmente.",
    historico: [
      {
        id: "h-8",
        data: new Date(Date.now() - 86400000 * 7).toISOString(),
        descricao: "Solicitação inicial",
      },
      {
        id: "h-9",
        data: new Date(Date.now() - 86400000 * 5).toISOString(),
        descricao: "Retirada realizada e aluguel concluído",
        autor: "Pátio Operacional",
      },
    ],
  },
];

export const getSolicitacoes = (): SolicitacaoAluguel[] => {
  if (typeof window === "undefined") return SEED_SOLICITACOES;
  try {
    const raw = window.localStorage.getItem(STORAGE_SOLICITACOES_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_SOLICITACOES_KEY, JSON.stringify(SEED_SOLICITACOES));
      return SEED_SOLICITACOES;
    }
    return JSON.parse(raw) as SolicitacaoAluguel[];
  } catch {
    return SEED_SOLICITACOES;
  }
};

export const getSolicitacaoById = (id: string): SolicitacaoAluguel | undefined => {
  const todas = getSolicitacoes();
  return todas.find((s) => s.id === id);
};

export const salvarSolicitacoes = (lista: SolicitacaoAluguel[]) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_SOLICITACOES_KEY, JSON.stringify(lista));
    } catch {
      /* erro silencioso */
    }
  }
};

export const criarSolicitacao = (payload: SolicitacaoPayload): SolicitacaoAluguel => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const nova: SolicitacaoAluguel = {
    ...payload,
    id: `SOL-${randomNum}`,
    dataCriacao: new Date().toISOString(),
    status: "Nova",
    historico: [
      {
        id: `h-${Date.now()}`,
        data: new Date().toISOString(),
        descricao: "Solicitação de aluguel criada pelo interessado",
      },
    ],
  };

  const atuais = getSolicitacoes();
  const atualizadas = [nova, ...atuais];
  salvarSolicitacoes(atualizadas);
  return nova;
};

export const atualizarStatusSolicitacao = (
  id: string,
  novoStatus: SolicitacaoStatus,
  nota?: string,
  autor = "Equipe ViagemMot",
): SolicitacaoAluguel | undefined => {
  const todas = getSolicitacoes();
  const index = todas.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  const anterior = todas[index];
  if (!anterior) return undefined;

  const historicoItem: HistoricoAlteracao = {
    id: `h-${Date.now()}`,
    data: new Date().toISOString(),
    descricao: nota
      ? `Status alterado de "${anterior.status}" para "${novoStatus}". Obs: ${nota}`
      : `Status alterado de "${anterior.status}" para "${novoStatus}"`,
    autor,
  };

  const novaNota = nota
    ? `${anterior.observacoesInternas ? anterior.observacoesInternas + "\n" : ""}[${new Date().toLocaleDateString("pt-BR")}] ${nota}`
    : anterior.observacoesInternas;

  const atualizada: SolicitacaoAluguel = {
    id: anterior.id,
    dataCriacao: anterior.dataCriacao,
    status: novoStatus,
    nome: anterior.nome,
    whatsapp: anterior.whatsapp,
    email: anterior.email,
    cidadeUf: anterior.cidadeUf,
    motoId: anterior.motoId,
    motoModelo: anterior.motoModelo,
    dataRetirada: anterior.dataRetirada,
    periodo: anterior.periodo,
    finalidade: anterior.finalidade,
    observacoes: anterior.observacoes,
    possuiCnhA: anterior.possuiCnhA,
    tempoHabilitacao: anterior.tempoHabilitacao,
    faixaEtaria: anterior.faixaEtaria,
    cidadeUso: anterior.cidadeUso,
    experienciaEntregas: anterior.experienciaEntregas,
    observacoesInternas: novaNota,
    historico: [historicoItem, ...anterior.historico],
  };

  todas[index] = atualizada;
  salvarSolicitacoes(todas);
  return atualizada;
};

export const atualizarObservacoesInternas = (
  id: string,
  observacoes: string,
): SolicitacaoAluguel | undefined => {
  const todas = getSolicitacoes();
  const index = todas.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  const anterior = todas[index];
  if (!anterior) return undefined;

  const atualizada: SolicitacaoAluguel = {
    ...anterior,
    observacoesInternas: observacoes,
  };

  todas[index] = atualizada;
  salvarSolicitacoes(todas);
  return atualizada;
};

export const getResumoAdmin = () => {
  const solicitacoes = getSolicitacoes();
  return {
    totalSolicitacoes: solicitacoes.length,
    totalMotos: getMotos().length,
    novas: solicitacoes.filter((s) => s.status === "Nova").length,
    emAnalise: solicitacoes.filter((s) => s.status === "Em análise").length,
    propostaEnviada: solicitacoes.filter((s) => s.status === "Proposta enviada").length,
    aprovadas: solicitacoes.filter((s) => s.status === "Aprovada").length,
    concluidas: solicitacoes.filter((s) => s.status === "Aluguel concluído").length,
  };
};

