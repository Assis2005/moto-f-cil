import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Filter,
  MessageCircle,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  User,
  Bike,
  Calendar,
  Shield,
  Save,
  Check,
  History,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { StatCard } from "@/components/ui-kit/StatCard";
import { PageHeader } from "@/components/ui-kit/Section";
import { dataBR } from "@/lib/format";
import {
  getSolicitacoes,
  atualizarStatusSolicitacao,
  atualizarObservacoesInternas,
  getMotos,
} from "@/lib/mock-api";
import {
  STATUS_CORES,
  TODAS_STATUS,
  gerarLinkWhatsAppPropostaAdmin,
} from "@/lib/constants";
import type { SolicitacaoAluguel, SolicitacaoStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Administrativo de Aluguéis — ViagemMot" },
      {
        name: "description",
        content: "Gerenciamento de solicitações de aluguel, análise de perfil e controle de status.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

export function AdminPage() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAluguel[]>([]);
  const [statusFiltro, setStatusFiltro] = useState<string>("Todos");
  const [busca, setBusca] = useState("");
  const [solicitacaoAtiva, setSolicitacaoAtiva] = useState<SolicitacaoAluguel | null>(null);

  // Estados para edição no modal de gerenciamento
  const [novoStatus, setNovoStatus] = useState<SolicitacaoStatus>("Nova");
  const [notaStatus, setNotaStatus] = useState("");
  const [observacoesInternas, setObservacoesInternas] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [feedbackSalvo, setFeedbackSalvo] = useState(false);

  const carregarDados = () => {
    const lista = getSolicitacoes();
    setSolicitacoes(lista);
    if (solicitacaoAtiva) {
      const atualizada = lista.find((s) => s.id === solicitacaoAtiva.id);
      if (atualizada) {
        setSolicitacaoAtiva(atualizada);
        setNovoStatus(atualizada.status);
        setObservacoesInternas(atualizada.observacoesInternas ?? "");
      }
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const abrirGerenciador = (sol: SolicitacaoAluguel) => {
    setSolicitacaoAtiva(sol);
    setNovoStatus(sol.status);
    setNotaStatus("");
    setObservacoesInternas(sol.observacoesInternas ?? "");
    setFeedbackSalvo(false);
  };

  const fecharGerenciador = () => {
    setSolicitacaoAtiva(null);
  };

  const handleSalvarStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!solicitacaoAtiva) return;

    setSalvando(true);
    const atualizada = atualizarStatusSolicitacao(
      solicitacaoAtiva.id,
      novoStatus,
      notaStatus.trim() || undefined,
      "Administrador",
    );

    if (atualizada) {
      setSolicitacaoAtiva(atualizada);
      setNotaStatus("");
      carregarDados();
      setFeedbackSalvo(true);
      setTimeout(() => setFeedbackSalvo(false), 2500);
    }
    setSalvando(false);
  };

  const handleSalvarObservacoes = () => {
    if (!solicitacaoAtiva) return;
    setSalvando(true);
    const atualizada = atualizarObservacoesInternas(solicitacaoAtiva.id, observacoesInternas.trim());
    if (atualizada) {
      setSolicitacaoAtiva(atualizada);
      carregarDados();
      setFeedbackSalvo(true);
      setTimeout(() => setFeedbackSalvo(false), 2500);
    }
    setSalvando(false);
  };

  // Filtragem de solicitações
  const solicitacoesFiltradas = useMemo(() => {
    return solicitacoes.filter((sol) => {
      const correspondeStatus = statusFiltro === "Todos" || sol.status === statusFiltro;
      const termo = busca.toLowerCase().trim();
      const correspondeBusca =
        !termo ||
        sol.nome.toLowerCase().includes(termo) ||
        sol.whatsapp.includes(termo) ||
        sol.id.toLowerCase().includes(termo) ||
        sol.motoModelo.toLowerCase().includes(termo) ||
        sol.cidadeUf.toLowerCase().includes(termo);

      return correspondeStatus && correspondeBusca;
    });
  }, [solicitacoes, statusFiltro, busca]);

  // Contadores para métricas
  const totalSolicitacoes = solicitacoes.length;
  const totalNovas = solicitacoes.filter((s) => s.status === "Nova").length;
  const totalEmAnalise = solicitacoes.filter((s) => s.status === "Em análise").length;
  const totalPropostas = solicitacoes.filter((s) => s.status === "Proposta enviada").length;
  const totalAprovadas = solicitacoes.filter((s) => s.status === "Aprovada").length;
  const totalConcluidas = solicitacoes.filter((s) => s.status === "Aluguel concluído").length;

  return (
    <SiteLayout>
      <section className="py-8 pb-16 md:py-12">
        <PageHeader
          eyebrow="Gestão Operacional"
          title="Painel de Solicitações de Aluguel"
          description="Acompanhe interessados, analise o perfil, envie propostas e gerencie o status de cada locação."
        />

        {/* Métricas Principais */}
        <div className="mb-6 mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total de solicitações" value={totalSolicitacoes} />
          <StatCard label="Novas" value={totalNovas} tone="default" />
          <StatCard label="Em análise" value={totalEmAnalise} tone="warning" />
          <StatCard label="Propostas enviadas" value={totalPropostas} />
          <StatCard label="Aprovadas" value={totalAprovadas} tone="success" />
          <StatCard label="Concluídas" value={totalConcluidas} tone="success" />
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="surface mb-6 rounded-2xl p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Campo de Busca */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-steel" />
              <input
                type="text"
                placeholder="Buscar por nome, WhatsApp, moto ou protocolo..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              {busca && (
                <button
                  type="button"
                  onClick={() => setBusca("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Contador de resultados */}
            <div className="text-xs text-steel">
              Exibindo <strong>{solicitacoesFiltradas.length}</strong> de{" "}
              <strong>{totalSolicitacoes}</strong> solicitações
            </div>
          </div>

          {/* Filtros por Status (Badges clicáveis) */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-3">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-steel">
              Status:
            </span>
            <button
              type="button"
              onClick={() => setStatusFiltro("Todos")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                statusFiltro === "Todos"
                  ? "bg-brand text-white font-semibold shadow-sm"
                  : "bg-secondary text-steel hover:text-ink",
              )}
            >
              Todos ({totalSolicitacoes})
            </button>
            {TODAS_STATUS.map((st) => {
              const count = solicitacoes.filter((s) => s.status === st).length;
              const isSelected = statusFiltro === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFiltro(st)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                    isSelected
                      ? "bg-brand text-white font-semibold shadow-sm"
                      : "bg-secondary text-steel hover:text-ink",
                  )}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista / Tabela de Solicitações */}
        <div className="surface overflow-hidden rounded-2xl border border-border/80">
          {solicitacoesFiltradas.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="mx-auto size-10 text-steel/60" />
              <h3 className="mt-3 font-display text-base font-semibold text-ink">
                Nenhuma solicitação encontrada
              </h3>
              <p className="mt-1 text-xs text-steel">
                Tente ajustar os filtros ou o termo de busca para encontrar o registro desejado.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatusFiltro("Todos");
                  setBusca("");
                }}
                className="mt-4 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-secondary"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/60 text-left text-[11px] uppercase tracking-[0.12em] text-steel">
                    <th className="px-4 py-3 font-semibold">Protocolo / Data</th>
                    <th className="px-4 py-3 font-semibold">Interessado</th>
                    <th className="px-4 py-3 font-semibold">Moto / Retirada</th>
                    <th className="px-4 py-3 font-semibold">Período</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 text-right font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {solicitacoesFiltradas.map((sol) => {
                    const statusInfo = STATUS_CORES[sol.status] ?? STATUS_CORES["Nova"];
                    return (
                      <tr key={sol.id} className="transition-colors hover:bg-secondary/30">
                        {/* Protocolo & Data */}
                        <td className="px-4 py-3.5">
                          <p className="font-mono text-xs font-bold text-ink">#{sol.id}</p>
                          <p className="mt-0.5 text-[11px] text-steel">
                            {new Date(sol.dataCriacao).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </td>

                        {/* Interessado */}
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-ink">{sol.nome}</p>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-steel">
                            <span>{sol.whatsapp}</span>
                            <a
                              href={gerarLinkWhatsAppPropostaAdmin(
                                sol.whatsapp,
                                sol.nome,
                                sol.motoModelo,
                                sol.id,
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Abrir WhatsApp do cliente"
                              className="inline-flex size-5 items-center justify-center rounded-md bg-[#25D366]/15 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                            >
                              <MessageCircle className="size-3.5" />
                            </a>
                          </div>
                        </td>

                        {/* Moto & Retirada */}
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-ink">{sol.motoModelo}</p>
                          <p className="mt-0.5 text-xs text-steel">
                            Retirada: {dataBR(sol.dataRetirada)}
                          </p>
                        </td>

                        {/* Período & Finalidade */}
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-ink">{sol.periodo}</p>
                          <p className="mt-0.5 max-w-[200px] truncate text-[11px] text-steel">
                            {sol.finalidade}
                          </p>
                        </td>

                        {/* Status Pill */}
                        <td className="px-4 py-3.5">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                              statusInfo.badge,
                            )}
                          >
                            {sol.status}
                          </span>
                        </td>

                        {/* Ações */}
                        <td className="px-4 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => abrirGerenciador(sol)}
                            className="inline-flex items-center gap-1 rounded-xl bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand transition-all hover:bg-brand hover:text-white"
                          >
                            <span>Gerenciar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL / DRAWER DE GERENCIAMENTO COMPLETO DA SOLICITAÇÃO                    */}
      {/* ========================================================================= */}
      {solicitacaoAtiva && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0" onClick={fecharGerenciador} />

          <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl">
            {/* Header do Gerenciador */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-brand text-white font-bold">
                  SOL
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-base font-bold text-ink sm:text-lg">
                      #{solicitacaoAtiva.id}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                        STATUS_CORES[solicitacaoAtiva.status]?.badge,
                      )}
                    >
                      {solicitacaoAtiva.status}
                    </span>
                  </div>
                  <p className="text-xs text-steel">
                    Solicitado em:{" "}
                    {new Date(solicitacaoAtiva.dataCriacao).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fecharGerenciador}
                  className="flex size-9 items-center justify-center rounded-xl text-steel transition-colors hover:bg-secondary hover:text-ink"
                  aria-label="Fechar"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Feedback salvo toast */}
            {feedbackSalvo && (
              <div className="flex items-center gap-2 bg-emerald-500 px-5 py-2 text-xs font-semibold text-white">
                <Check className="size-4" />
                <span>Alterações salvas com sucesso no sistema e registradas no histórico!</span>
              </div>
            )}

            {/* Conteúdo Rolável do Modal */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Botão de Ação Rápida WhatsApp no Topo */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3.5">
                <div>
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Atendimento Direto ao Cliente
                  </p>
                  <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400">
                    Abra o WhatsApp do cliente com proposta pré-formatada informando o protocolo.
                  </p>
                </div>
                <a
                  href={gerarLinkWhatsAppPropostaAdmin(
                    solicitacaoAtiva.whatsapp,
                    solicitacaoAtiva.nome,
                    solicitacaoAtiva.motoModelo,
                    solicitacaoAtiva.id,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#20ba59]"
                >
                  <MessageCircle className="size-4" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>

              {/* Grid com 3 Cards de Informação */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Card 1: Interessado */}
                <div className="rounded-2xl border border-border bg-secondary/20 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-steel">
                    <User className="size-4 text-brand" />
                    <span>Dados do Interessado</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Nome:</span>
                    <p className="text-sm font-semibold text-ink">{solicitacaoAtiva.nome}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">WhatsApp:</span>
                    <p className="text-sm font-semibold text-ink">{solicitacaoAtiva.whatsapp}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">E-mail:</span>
                    <p className="text-xs text-ink truncate">{solicitacaoAtiva.email}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Cidade/UF:</span>
                    <p className="text-xs text-ink">{solicitacaoAtiva.cidadeUf}</p>
                  </div>
                </div>

                {/* Card 2: Aluguel */}
                <div className="rounded-2xl border border-border bg-secondary/20 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-steel">
                    <Bike className="size-4 text-brand" />
                    <span>Dados do Aluguel</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Moto Pretendida:</span>
                    <p className="text-sm font-semibold text-ink">{solicitacaoAtiva.motoModelo}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Retirada Desejada:</span>
                    <p className="text-sm font-semibold text-ink">
                      {dataBR(solicitacaoAtiva.dataRetirada)}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Período:</span>
                    <p className="text-xs text-ink">{solicitacaoAtiva.periodo}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Finalidade:</span>
                    <p className="text-xs text-ink">{solicitacaoAtiva.finalidade}</p>
                  </div>
                  {solicitacaoAtiva.observacoes && (
                    <div>
                      <span className="text-[11px] text-steel">Observações do Cliente:</span>
                      <p className="text-xs text-ink italic">{solicitacaoAtiva.observacoes}</p>
                    </div>
                  )}
                </div>

                {/* Card 3: Perfil */}
                <div className="rounded-2xl border border-border bg-secondary/20 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-steel">
                    <Shield className="size-4 text-brand" />
                    <span>Perfil do Condutor</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Possui CNH Categoria A:</span>
                    <p className="text-sm font-semibold text-ink">{solicitacaoAtiva.possuiCnhA}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Tempo de Habilitação:</span>
                    <p className="text-xs text-ink">{solicitacaoAtiva.tempoHabilitacao}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Faixa Etária:</span>
                    <p className="text-xs text-ink">{solicitacaoAtiva.faixaEtaria}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-steel">Cidade de Uso:</span>
                    <p className="text-xs text-ink">{solicitacaoAtiva.cidadeUso}</p>
                  </div>
                  {solicitacaoAtiva.experienciaEntregas && (
                    <div>
                      <span className="text-[11px] text-steel">Experiência em Apps:</span>
                      <p className="text-xs text-ink">{solicitacaoAtiva.experienciaEntregas}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Seção de Atualização de Status & Observações Internas */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Alteração de Status */}
                <form
                  onSubmit={handleSalvarStatus}
                  className="rounded-2xl border border-border bg-card p-4 space-y-3.5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink">
                    <Sparkles className="size-4 text-brand" />
                    <span>Alterar Status da Solicitação</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Novo Status:</label>
                    <select
                      value={novoStatus}
                      onChange={(e) => setNovoStatus(e.target.value as SolicitacaoStatus)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      {TODAS_STATUS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Nota ou motivo da alteração (gravado no histórico):
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Proposta enviada pelo WhatsApp / Cadastro aprovado"
                      value={notaStatus}
                      onChange={(e) => setNotaStatus(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={salvando}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand/90 disabled:opacity-50"
                  >
                    <Save className="size-3.5" />
                    <span>Salvar Novo Status</span>
                  </button>
                </form>

                {/* Observações Internas */}
                <div className="rounded-2xl border border-border bg-card p-4 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink">
                      <FileText className="size-4 text-brand" />
                      <span>Observações Internas da Equipe</span>
                    </div>
                    <p className="text-[11px] text-steel">
                      Anotações visíveis apenas para a equipe operacional (não enviadas ao cliente).
                    </p>
                    <textarea
                      rows={3}
                      value={observacoesInternas}
                      onChange={(e) => setObservacoesInternas(e.target.value)}
                      placeholder="Ex: Cliente tem preferência de cor preta; solicitou retirada no período da manhã..."
                      className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSalvarObservacoes}
                    disabled={salvando}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-2.5 text-xs font-bold text-ink transition-colors hover:bg-secondary/70 disabled:opacity-50"
                  >
                    <Save className="size-3.5" />
                    <span>Salvar Observações Internas</span>
                  </button>
                </div>
              </div>

              {/* Histórico de Alterações Auditável */}
              <div className="rounded-2xl border border-border bg-secondary/20 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel">
                  <History className="size-4 text-brand" />
                  <span>Histórico de Alterações ({solicitacaoAtiva.historico.length})</span>
                </div>

                <div className="space-y-2.5">
                  {solicitacaoAtiva.historico.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3 text-xs"
                    >
                      <div className="mt-0.5 size-2 rounded-full bg-brand shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ink">{item.descricao}</p>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-steel">
                          <span>
                            {new Date(item.data).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {item.autor && (
                            <>
                              <span>·</span>
                              <span>Por: {item.autor}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="flex items-center justify-end border-t border-border bg-secondary/30 px-6 py-3">
              <button
                type="button"
                onClick={fecharGerenciador}
                className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-steel transition-colors hover:text-ink"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
