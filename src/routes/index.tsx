import { createFileRoute, Link } from "@tanstack/react-router";
import heroRider from "@/assets/hero-rider.jpg";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { MotoCard } from "@/components/ui-kit/MotoCard";
import { PlanoCard } from "@/components/ui-kit/PlanoCard";
import { FaqList } from "@/components/ui-kit/FaqList";
import {
  getBeneficios,
  getComoFunciona,
  getFaq,
  getMotosDestaque,
  getPlanos,
} from "@/lib/mock-api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ViagemMot — Aluguel de motos para entregadores de app" },
      {
        name: "description",
        content:
          "Locação de motos para entregadores de iFood, Uber e Mercado Livre. Baixa entrada, seguro incluso e análise cadastral em até 24h.",
      },
      { property: "og:title", content: "ViagemMot — Aluguel de motos para entregadores" },
      {
        property: "og:description",
        content: "Planos semanal, quinzenal e mensal com seguro e manutenção inclusos.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const beneficios = getBeneficios();
  const passos = getComoFunciona();
  const motos = getMotosDestaque();
  const planos = getPlanos();
  const faq = getFaq();

  return (
    <SiteLayout>
      <section className="py-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="glass flex min-h-[300px] flex-col justify-between rounded-2xl p-7 md:col-span-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-warm/15 px-3 py-1 text-xs font-medium text-warning">
                Aprovação em 24h
              </span>
              <h1 className="mt-4 max-w-[20ch] text-balance font-display text-4xl font-semibold leading-tight">
                Moto pronta para a próxima corrida.
              </h1>
              <p className="mt-3 text-pretty text-base text-steel">
                Locação para entregadores de app. Preço claro, baixa entrada e documentação que
                você resolve no celular.
              </p>
            </div>
            <Link
              to="/cadastro"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-warm px-5 py-3 text-sm font-semibold text-ink ring-1 ring-accent-warm/40"
            >
              Quero Alugar uma Moto
            </Link>
          </div>
          <div className="md:col-span-7">
            <img
              src={heroRider}
              alt="Entregador pilotando uma moto na cidade ao amanhecer"
              width={1200}
              height={900}
              className="h-full min-h-[220px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {beneficios.map((b) => (
            <div key={b.numero} className="glass rounded-2xl p-5">
              <div className="grid size-9 place-items-center rounded-lg bg-brand/10 font-display font-semibold text-brand">
                {b.numero}
              </div>
              <h3 className="mt-3 font-display font-semibold">{b.titulo}</h3>
              <p className="mt-1 text-pretty text-sm text-steel">{b.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-20 py-8">
        <h2 className="mb-4 max-w-[40ch] text-balance font-display text-2xl font-semibold">
          Como funciona
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((p) => (
            <div key={p.numero} className="glass rounded-2xl p-5">
              <span className="font-display text-sm font-semibold text-brand">Passo {p.numero}</span>
              <h3 className="mt-2 font-display font-semibold">{p.titulo}</h3>
              <p className="mt-1 text-pretty text-sm text-steel">{p.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="max-w-[40ch] text-balance font-display text-2xl font-semibold">
            Modelos de motos
          </h2>
          <Link to="/motos" className="text-sm font-medium text-brand">
            Ver todas
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {motos.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      </section>

      <section id="planos" className="scroll-mt-20 py-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="max-w-[40ch] text-balance font-display text-2xl font-semibold">
            Planos e preços
          </h2>
          <Link to="/planos" className="text-sm font-medium text-brand">
            Ver detalhes
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {planos.map((plano) => (
            <PlanoCard key={plano.id} plano={plano} />
          ))}
        </div>
      </section>

      <section className="py-8 pb-16">
        <h2 className="mb-4 max-w-[40ch] text-balance font-display text-2xl font-semibold">
          Perguntas frequentes
        </h2>
        <FaqList itens={faq} />
        <div className="glass mt-6 flex flex-col items-center gap-4 rounded-2xl p-7 text-center">
          <h3 className="max-w-[24ch] text-balance font-display text-2xl font-semibold">
            Sua próxima entrega começa com a moto certa.
          </h3>
          <Link
            to="/cadastro"
            className="inline-flex items-center justify-center rounded-lg bg-accent-warm px-6 py-3 text-sm font-semibold text-ink ring-1 ring-accent-warm/40"
          >
            Quero Alugar uma Moto
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
