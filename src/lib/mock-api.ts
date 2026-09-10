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
  Moto,
  Passo,
  Plano,
} from "./types";

const STORAGE_KEY = "viagemmot:cadastros";

export const getMotos = (): Moto[] => motosJson as Moto[];

export const getMotosDestaque = (): Moto[] => getMotos().slice(0, 3);

export const getPlanos = (): Plano[] => planosJson as Plano[];

export const getBeneficios = (): Beneficio[] => beneficiosJson as Beneficio[];

export const getComoFunciona = (): Passo[] => comoFuncionaJson as Passo[];

export const getFaq = (): FaqItem[] => faqJson as FaqItem[];

const getCadastrosLocais = (): Cadastro[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
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
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([novo, ...getCadastrosLocais()]));
    } catch {
      /* armazenamento indisponível: segue sem persistir */
    }
  }
  return novo;
};

export const getResumoAdmin = () => {
  const cadastros = getCadastros();
  return {
    totalCadastros: cadastros.length,
    totalMotos: getMotos().length,
    pendentes: cadastros.filter((c) => c.status === "pendente").length,
    aprovados: cadastros.filter((c) => c.status === "aprovado").length,
  };
};
