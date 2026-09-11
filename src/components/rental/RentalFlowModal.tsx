import React, { useState, useEffect } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  ChevronRight,
  AlertCircle,
  MapPin,
  User,
  Info,
} from "lucide-react";
import { useRentalFlow } from "@/hooks/useRentalFlow";
import { getMotos, criarSolicitacao } from "@/lib/mock-api";
import { getMotoImage } from "@/data/moto-images";
import { brl, maskTelefone, dataBR } from "@/lib/format";
import {
  gerarLinkWhatsAppInteresse,
  gerarLinkWhatsAppProtocolo,
  EMPRESA_WHATSAPP_NUMERO,
} from "@/lib/constants";
import type { Moto, SolicitacaoAluguel } from "@/lib/types";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2 | 3 | 4;

export function RentalFlowModal() {
  const { isOpen, selectedMoto, closeRentalFlow } = useRentalFlow();

  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [solicitacaoFinalizada, setSolicitacaoFinalizada] = useState<SolicitacaoAluguel | null>(null);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  // Lista de motos da frota
  const [todasMotos, setTodasMotos] = useState<Moto[]>([]);

  // Formulário - Etapa 1: Dados Pessoais
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [cidadeUf, setCidadeUf] = useState("São Paulo / SP");

  // Formulário - Etapa 2: Aluguel
  const [motoSelecionadaId, setMotoSelecionadaId] = useState<string>("");
  const [dataRetirada, setDataRetirada] = useState("");
  const [periodo, setPeriodo] = useState("Semanal");
  const [finalidade, setFinalidade] = useState("Entregas por aplicativo (iFood, Rappi, etc.)");
  const [observacoes, setObservacoes] = useState("");

  // Formulário - Etapa 3: Perfil
  const [possuiCnhA, setPossuiCnhA] = useState("Sim, CNH definitiva");
  const [tempoHabilitacao, setTempoHabilitacao] = useState("1 a 2 anos");
  const [faixaEtaria, setFaixaEtaria] = useState("25 a 34 anos");
  const [cidadeUso, setCidadeUso] = useState("São Paulo e Região Metropolitana");
  const [experienciaEntregas, setExperienciaEntregas] = useState("Sim, já trabalho com entregas");
  const [concordouTermos, setConcordouTermos] = useState(true);

  interface FormErros {
    nome?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    cidadeUf?: string | undefined;
    dataRetirada?: string | undefined;
    termos?: string | undefined;
  }

  // Erros de validação
  const [erros, setErros] = useState<FormErros>({});

  useEffect(() => {
    setTodasMotos(getMotos());
  }, []);

  // Ao abrir o modal ou mudar a moto selecionada, resetar estado apropriadamente
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSubmitting(false);
      setSolicitacaoFinalizada(null);
      setErros({});
      if (selectedMoto) {
        setMotoSelecionadaId(selectedMoto.id);
      } else {
        const motos = getMotos();
        const primeira = motos[0];
        if (primeira) {
          setMotoSelecionadaId(primeira.id);
        }
      }
      // Data padrão: hoje + 2 dias
      const dataSugerida = new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10);
      setDataRetirada(dataSugerida);
    }
  }, [isOpen, selectedMoto]);

  if (!isOpen) return null;

  const motoAtual = todasMotos.find((m) => m.id === motoSelecionadaId) ?? selectedMoto;

  // Validação da Etapa 1
  const validarEtapa1 = () => {
    const novosErros: FormErros = {};
    if (!nome.trim() || nome.trim().length < 3) {
      novosErros.nome = "Por favor, informe seu nome completo.";
    }
    const numerosWhatsapp = whatsapp.replace(/\D/g, "");
    if (!numerosWhatsapp || numerosWhatsapp.length < 10) {
      novosErros.whatsapp = "Informe um WhatsApp válido com DDD (mínimo 10 dígitos).";
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      novosErros.email = "Informe um e-mail válido.";
    }
    if (!cidadeUf.trim()) {
      novosErros.cidadeUf = "Informe sua cidade e UF.";
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Validação da Etapa 2
  const validarEtapa2 = () => {
    const novosErros: FormErros = {};
    if (!dataRetirada) {
      novosErros.dataRetirada = "Selecione uma data desejada para retirada.";
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Envio da Solicitação (Etapa 3 -> Etapa 4)
  const handleEnviarSolicitacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concordouTermos) {
      setErros({ termos: "É necessário confirmar que está ciente da análise de perfil." });
      return;
    }

    setSubmitting(true);
    setErros({});

    setTimeout(() => {
      const modeloNome = motoAtual ? `${motoAtual.modelo} (${motoAtual.ano})` : "Modelo a definir";
      const nova = criarSolicitacao({
        nome: nome.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        cidadeUf: cidadeUf.trim(),
        motoId: motoAtual?.id ?? undefined,
        motoModelo: modeloNome,
        dataRetirada,
        periodo,
        finalidade,
        observacoes: observacoes.trim() || undefined,
        possuiCnhA,
        tempoHabilitacao,
        faixaEtaria,
        cidadeUso: cidadeUso.trim() || cidadeUf.trim(),
        experienciaEntregas: experienciaEntregas || undefined,
      });

      setSolicitacaoFinalizada(nova);
      setSubmitting(false);

      setStep(4);
    }, 600);
  };

  const handleCopiarProtocolo = () => {
    if (solicitacaoFinalizada?.id) {
      navigator.clipboard.writeText(solicitacaoFinalizada.id);
      setCopiedProtocol(true);
      setTimeout(() => setCopiedProtocol(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm transition-all sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop clicável */}
      <div className="fixed inset-0" onClick={closeRentalFlow} />

      {/* Container Principal com layout responsivo mobile-first */}
      <div
        className={cn(
          "relative z-10 flex w-full flex-col overflow-hidden bg-card text-card-foreground shadow-2xl transition-all duration-300",
          "max-h-[92vh] rounded-t-[28px] sm:max-h-[90vh] sm:max-w-xl sm:rounded-3xl border border-border/80",
        )}
      >
        {/* Puxador para mobile */}
        <div className="flex w-full justify-center pt-2 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-border" />
        </div>

        {/* Top Header com navegação e botão fechar */}
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            {step > 0 && step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="flex size-9 items-center justify-center rounded-xl text-steel transition-colors hover:bg-secondary hover:text-ink"
                aria-label="Voltar etapa"
              >
                <ArrowLeft className="size-5" />
              </button>
            ) : null}
            <div>
              <p className="font-display text-sm font-semibold tracking-tight sm:text-base">
                {step === 0 && "Fluxo de Locação"}
                {step === 1 && "Passo 1 de 3: Dados de Contato"}
                {step === 2 && "Passo 2 de 3: Informações do Aluguel"}
                {step === 3 && "Passo 3 de 3: Perfil do Condutor"}
                {step === 4 && "Solicitação Registrada"}
              </p>
              {step > 0 && step < 4 && (
                <p className="text-xs text-steel">
                  {step === 1 && "Preencha para receber a análise e proposta"}
                  {step === 2 && "Escolha o período e a moto ideal"}
                  {step === 3 && "Informações para verificação de locação"}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={closeRentalFlow}
            className="flex size-9 items-center justify-center rounded-xl text-steel transition-colors hover:bg-secondary hover:text-ink"
            aria-label="Fechar modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Barra de progresso para os passos 1, 2 e 3 */}
        {step >= 1 && step <= 3 && (
          <div className="bg-secondary/40 px-5 py-2 sm:px-6">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-steel">
              <span className={step >= 1 ? "text-brand" : ""}>1. Contato</span>
              <span className={step >= 2 ? "text-brand" : ""}>2. Aluguel</span>
              <span className={step >= 3 ? "text-brand" : ""}>3. Perfil</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-brand transition-all duration-300"
                style={{
                  width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                }}
              />
            </div>
          </div>
        )}

        {/* Conteúdo rolável */}
        <div className="overflow-y-auto p-5 pb-8 sm:p-6">
          {/* ========================================================================= */}
          {/* ETAPA 0: ESCOLHA IMEDIATA DE CANAL (WhatsApp vs Adiantar Solicitação)     */}
          {/* ========================================================================= */}
          {step === 0 && (
            <div className="space-y-5">
              {/* Card da Moto Selecionada */}
              {motoAtual ? (
                <div className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-secondary/30 p-3 sm:p-4">
                  <img
                    src={getMotoImage(motoAtual.id)}
                    alt={motoAtual.modelo}
                    className="size-20 rounded-xl object-cover sm:size-24"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center rounded-md bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">
                      {motoAtual.ano} · {motoAtual.cilindrada}
                    </span>
                    <h3 className="mt-1 truncate font-display text-base font-bold tracking-tight text-ink sm:text-lg">
                      {motoAtual.modelo}
                    </h3>
                    <p className="mt-0.5 font-display text-sm font-semibold text-brand sm:text-base">
                      {brl(motoAtual.valorSemanal)}
                      <span className="text-xs font-normal text-steel">/semana</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 text-center">
                  <p className="font-display text-base font-bold text-ink">
                    Aluguel de Moto Fácil e Rápido
                  </p>
                  <p className="mt-1 text-xs text-steel">
                    Motos revisadas, seguro incluso e suporte 24h para você trabalhar tranquilo.
                  </p>
                </div>
              )}

              <div className="text-center sm:text-left">
                <h4 className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                  {motoAtual ? "Quer alugar esta moto?" : "Como prefere continuar?"}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-steel sm:text-sm">
                  Escolha se deseja atendimento humano imediato pelo WhatsApp ou adiantar sua
                  análise de perfil agora mesmo:
                </p>
              </div>

              {/* OPÇÃO 1: WhatsApp */}
              <div className="space-y-2">
                <a
                  href={gerarLinkWhatsAppInteresse(motoAtual?.modelo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between rounded-2xl bg-[#25D366] px-5 py-4 text-white shadow-md transition-all hover:bg-[#20ba59] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-11 place-items-center rounded-xl bg-white/20">
                      <MessageCircle className="size-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-display text-base font-bold leading-tight">
                        Falar com atendente no WhatsApp
                      </p>
                      <p className="text-xs text-white/90">
                        Atendimento humano rápido e negociação direta
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
                <p className="px-2 text-center text-[11px] text-steel sm:text-left">
                  ⚡ O WhatsApp abrirá com mensagem pré-preenchida com o modelo da moto.
                </p>
              </div>

              {/* Divisor "OU" */}
              <div className="relative flex items-center justify-center py-1">
                <div className="w-full border-t border-border" />
                <span className="absolute bg-card px-3 text-xs font-semibold uppercase tracking-wider text-steel">
                  ou
                </span>
              </div>

              {/* OPÇÃO 2: Formulário de Pré-Aluguel */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="group flex w-full items-center justify-between rounded-2xl border-2 border-brand bg-brand/5 px-5 py-4 text-brand transition-all hover:bg-brand hover:text-white active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-11 place-items-center rounded-xl bg-brand/10 group-hover:bg-white/20">
                      <Sparkles className="size-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-display text-base font-bold leading-tight">
                        Adiantar minha solicitação
                      </p>
                      <p className="text-xs text-steel group-hover:text-white/90">
                        Preencha em ~2 min para análise de perfil e proposta
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="px-2 text-center text-[11px] text-steel sm:text-left">
                  📋 Economize tempo: a equipe já recebe seus dados e prepara a proposta.
                </p>
              </div>

              {/* Transparência e Confiança */}
              <div className="rounded-xl border border-border/70 bg-secondary/20 p-3 text-[11px] leading-relaxed text-steel">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    <strong>Transparência:</strong> O envio da solicitação não garante aprovação
                    automática e não exige nenhum pagamento antecipado.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ETAPA 1: INFORMAÇÕES BÁSICAS                                              */}
          {/* ========================================================================= */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (validarEtapa1()) {
                  setStep(2);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-ink">
                  Nome completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Carlos Eduardo de Oliveira"
                  className={cn(
                    "mt-1.5 w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-brand",
                    erros.nome ? "border-rose-500 ring-1 ring-rose-500" : "border-border",
                  )}
                />
                {erros.nome && <p className="mt-1 text-xs text-rose-500">{erros.nome}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink">
                  WhatsApp com DDD <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(maskTelefone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  className={cn(
                    "mt-1.5 w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-brand",
                    erros.whatsapp ? "border-rose-500 ring-1 ring-rose-500" : "border-border",
                  )}
                />
                {erros.whatsapp ? (
                  <p className="mt-1 text-xs text-rose-500">{erros.whatsapp}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-steel">
                    Usaremos este número para enviar a resposta e a proposta.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink">
                  E-mail <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className={cn(
                    "mt-1.5 w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-brand",
                    erros.email ? "border-rose-500 ring-1 ring-rose-500" : "border-border",
                  )}
                />
                {erros.email && <p className="mt-1 text-xs text-rose-500">{erros.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink">
                  Cidade e Estado onde reside <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={cidadeUf}
                  onChange={(e) => setCidadeUf(e.target.value)}
                  placeholder="Ex: São Paulo / SP"
                  className={cn(
                    "mt-1.5 w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-brand",
                    erros.cidadeUf ? "border-rose-500 ring-1 ring-rose-500" : "border-border",
                  )}
                />
                {erros.cidadeUf && <p className="mt-1 text-xs text-rose-500">{erros.cidadeUf}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand/90 active:scale-[0.99]"
                >
                  <span>Avançar para dados do aluguel</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* ETAPA 2: INFORMAÇÕES DO ALUGUEL                                           */}
          {/* ========================================================================= */}
          {step === 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (validarEtapa2()) {
                  setStep(3);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-ink">
                  Moto de interesse <span className="text-rose-500">*</span>
                </label>
                <select
                  value={motoSelecionadaId}
                  onChange={(e) => setMotoSelecionadaId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {todasMotos.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.modelo} ({m.ano} - {m.cilindrada}) — {brl(m.valorSemanal)}/sem
                    </option>
                  ))}
                  <option value="indiferente">Quero recomendação da equipe</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-ink">
                    Data pretendida de retirada <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dataRetirada}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDataRetirada(e.target.value)}
                    className={cn(
                      "mt-1.5 w-full rounded-xl border bg-background px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand",
                      erros.dataRetirada ? "border-rose-500 ring-1 ring-rose-500" : "border-border",
                    )}
                  />
                  {erros.dataRetirada && (
                    <p className="mt-1 text-xs text-rose-500">{erros.dataRetirada}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">
                    Período pretendido <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="Semanal">Semanal (Mais flexível)</option>
                    <option value="Quinzenal">Quinzenal</option>
                    <option value="Mensal">Mensal (Melhor custo-benefício)</option>
                    <option value="Mais de 3 meses">Mais de 3 meses (Longo prazo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink">
                  Finalidade principal do aluguel
                </label>
                <select
                  value={finalidade}
                  onChange={(e) => setFinalidade(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="Entregas por aplicativo (iFood, Rappi, etc.)">
                    Entregas por aplicativo (iFood, Rappi, Zé, Loggi)
                  </option>
                  <option value="Locomoção para o trabalho e uso diário">
                    Locomoção para trabalho e uso diário
                  </option>
                  <option value="Uso pessoal e passeios">Uso pessoal e lazer</option>
                  <option value="Outro">Outro objetivo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink">
                  Observações adicionais (opcional)
                </label>
                <textarea
                  rows={2}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Ex: Prefiro moto com baú já instalado, ou tenho preferência de cor..."
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-steel transition-colors hover:bg-secondary hover:text-ink"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand/90 active:scale-[0.99]"
                >
                  <span>Avançar para perfil do condutor</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* ETAPA 3: PERFIL DO INTERESSADO                                            */}
          {/* ========================================================================= */}
          {step === 3 && (
            <form onSubmit={handleEnviarSolicitacao} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink">
                  Possui CNH categoria A (Moto)? <span className="text-rose-500">*</span>
                </label>
                <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    "Sim, CNH definitiva",
                    "Sim, permissão (PPD)",
                    "Não / Em processo",
                  ].map((opcao) => (
                    <label
                      key={opcao}
                      className={cn(
                        "flex cursor-pointer items-center justify-center rounded-xl border p-2.5 text-center text-xs font-medium transition-all",
                        possuiCnhA === opcao
                          ? "border-brand bg-brand/10 font-semibold text-brand"
                          : "border-border text-steel hover:bg-secondary",
                      )}
                    >
                      <input
                        type="radio"
                        name="cnh"
                        value={opcao}
                        checked={possuiCnhA === opcao}
                        onChange={(e) => setPossuiCnhA(e.target.value)}
                        className="sr-only"
                      />
                      <span>{opcao}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-ink">
                    Tempo de habilitação moto
                  </label>
                  <select
                    value={tempoHabilitacao}
                    onChange={(e) => setTempoHabilitacao(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="Menos de 1 ano">Menos de 1 ano</option>
                    <option value="1 a 2 anos">1 a 2 anos</option>
                    <option value="3 a 5 anos">3 a 5 anos</option>
                    <option value="Mais de 5 anos">Mais de 5 anos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Faixa etária</label>
                  <select
                    value={faixaEtaria}
                    onChange={(e) => setFaixaEtaria(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="18 a 24 anos">18 a 24 anos</option>
                    <option value="25 a 34 anos">25 a 34 anos</option>
                    <option value="35 a 49 anos">35 a 49 anos</option>
                    <option value="50 anos ou mais">50 anos ou mais</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink">
                  Cidade / Região onde pretende rodar com a moto
                </label>
                <input
                  type="text"
                  value={cidadeUso}
                  onChange={(e) => setCidadeUso(e.target.value)}
                  placeholder="Ex: São Paulo e Grande SP"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink">
                  Experiência anterior com entregas de aplicativo
                </label>
                <select
                  value={experienciaEntregas}
                  onChange={(e) => setExperienciaEntregas(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="Sim, já trabalho com entregas">
                    Sim, já trabalho atualmente com entregas
                  </option>
                  <option value="Sim, já trabalhei no passado">Sim, já trabalhei no passado</option>
                  <option value="Não, vou começar agora">
                    Não, vou começar a fazer entregas agora
                  </option>
                  <option value="Não pretendo fazer entregas (uso próprio)">
                    Não pretendo fazer entregas (uso próprio)
                  </option>
                </select>
              </div>

              {/* Termo de Ciência e Transparência */}
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={concordouTermos}
                    onChange={(e) => setConcordouTermos(e.target.checked)}
                    className="mt-0.5 size-4 rounded text-brand focus:ring-brand"
                  />
                  <span className="text-xs leading-relaxed text-steel">
                    Estou ciente de que o preenchimento deste formulário{" "}
                    <strong className="text-ink">não garante aprovação imediata</strong>. A equipe
                    ViagemMot analisará meu perfil, disponibilidade da moto e entrará em contato via
                    WhatsApp com a proposta oficial.
                  </span>
                </label>
                {erros.termos && <p className="mt-1.5 text-xs text-rose-500">{erros.termos}</p>}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center justify-center rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-steel transition-colors hover:bg-secondary hover:text-ink"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand/90 disabled:opacity-75 active:scale-[0.99]"
                >
                  {submitting ? (
                    <>
                      <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Registrando solicitação...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4" />
                      <span>Enviar solicitação para análise</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* ETAPA 4: ANÁLISE DO PERFIL (CONFIRMAÇÃO PÓS-ENVIO)                        */}
          {/* ========================================================================= */}
          {step === 4 && solicitacaoFinalizada && (
            <div className="space-y-5 text-center sm:text-left">
              <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-500/15 text-amber-600 sm:mx-0">
                <Clock className="size-8" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700">
                  <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                  Status: Em análise
                </div>
                <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-ink">
                  Solicitação recebida!
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  Agora nossa equipe irá verificar seu perfil, a disponibilidade da moto e as
                  condições do aluguel. Assim que tivermos uma proposta, entraremos em contato pelo
                  WhatsApp.
                </p>
              </div>

              {/* Card de Resumo da Solicitação */}
              <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4 text-left">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-steel">
                      Protocolo da solicitação
                    </p>
                    <p className="font-mono text-base font-bold text-ink">
                      #{solicitacaoFinalizada.id}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopiarProtocolo}
                    className="flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-steel transition-colors hover:text-ink"
                  >
                    {copiedProtocol ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-2">
                  <div>
                    <span className="text-steel">Moto solicitada:</span>
                    <p className="font-semibold text-ink">{solicitacaoFinalizada.motoModelo}</p>
                  </div>
                  <div>
                    <span className="text-steel">Período pretendido:</span>
                    <p className="font-semibold text-ink">{solicitacaoFinalizada.periodo}</p>
                  </div>
                  <div>
                    <span className="text-steel">Retirada desejada:</span>
                    <p className="font-semibold text-ink">
                      {dataBR(solicitacaoFinalizada.dataRetirada)}
                    </p>
                  </div>
                  <div>
                    <span className="text-steel">Interessado:</span>
                    <p className="font-semibold text-ink">{solicitacaoFinalizada.nome}</p>
                  </div>
                </div>
              </div>

              {/* Botão de Falar com Atendente no WhatsApp com protocolo */}
              <div className="space-y-2 pt-1">
                <a
                  href={gerarLinkWhatsAppProtocolo(
                    solicitacaoFinalizada.id,
                    solicitacaoFinalizada.motoModelo,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#20ba59] active:scale-[0.99]"
                >
                  <MessageCircle className="size-5" />
                  <span>Falar com atendente no WhatsApp</span>
                </a>
                <p className="text-center text-[11px] text-steel">
                  Abre uma conversa direta informando seu protocolo #{solicitacaoFinalizada.id}.
                </p>
              </div>

              <div className="border-t border-border/80 pt-3">
                <button
                  type="button"
                  onClick={closeRentalFlow}
                  className="w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-steel transition-colors hover:bg-secondary hover:text-ink"
                >
                  Concluir e voltar ao site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
