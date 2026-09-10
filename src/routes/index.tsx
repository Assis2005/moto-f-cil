import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Clock3, Wallet } from "lucide-react";
import heroRider from "@/assets/hero-rider.jpg";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { MotoCard } from "@/components/ui-kit/MotoCard";
import { PlanoCard } from "@/components/ui-kit/PlanoCard";
import { FaqList } from "@/components/ui-kit/FaqList";
import { Section, SectionHeading } from "@/components/ui-kit/Section";
import { CtaLink } from "@/components/ui-kit/CtaLink";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
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

const beneficioIcons = [Wallet, ShieldCheck, Clock3];

function Home() {
  const beneficios = getBeneficios();
  const passos = getComoFunciona();
  const motos = getMotosDestaque();
  const planos = getPlanos();
  const faq = getFaq();

  return (
    <SiteLayout>
      <section className="pt-8 md:pt-12">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={heroRider}
            alt="Entregador pilotando uma moto na cidade ao amanhecer"
            width={1200}
            height={900}
            className="h-[440px] w-full object-cover md:h-[560px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/25" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:max-w-xl md:p-12">
            <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
              Aprovação em 24h
            </span>
            <h1 className="mt-4 max-w-[16ch] text-balance font-display text-4xl font-semibold leading-[1.08] text-white md:text-5xl">
              Moto pronta para a próxima corrida.
            </h1>
            <p className="mt-3 max-w-[42ch] text-pretty text-sm leading-relaxed text-white/80 md:text-base">
              Locação para entregadores de app. Preço claro, baixa entrada e documentação que você
              resolve no celular.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink to="/cadastro" size="lg" className="font-semibold">
                Quero alugar uma moto
              </CtaLink>
              <Link
                to="/motos"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-white/10 font-semibold text-white hover:bg-white/20 hover:text-white",
                )}
              >
                Ver frota
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {beneficios.map((b, i) => {
            const Icon = beneficioIcons[i] ?? Wallet;
            return (
              <div key={b.numero} className="surface rounded-2xl p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{b.titulo}</h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-steel">{b.descricao}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Section id="como-funciona">
        <SectionHeading eyebrow="Processo" title="Como funciona" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((p) => (
            <div key={p.numero} className="surface rounded-2xl p-5">
              <span className="font-display text-xs font-semibold tracking-[0.16em] text-brand">
                0{p.numero}
              </span>
              <h3 className="mt-3 font-display font-semibold tracking-tight">{p.titulo}</h3>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-steel">{p.descricao}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Frota"
          title="Modelos de motos"
          action={{ to: "/motos", label: "Ver todas" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {motos.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      </Section>

      <Section id="planos">
        <SectionHeading
          eyebrow="Valores"
          title="Planos e preços"
          action={{ to: "/planos", label: "Ver detalhes" }}
        />
        <div className="grid gap-4 pt-2 sm:grid-cols-3">
          {planos.map((plano) => (
            <PlanoCard key={plano.id} plano={plano} />
          ))}
        </div>
      </Section>

      <Section className="pb-16">
        <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />
        <FaqList itens={faq} />
        <div className="mt-8 overflow-hidden rounded-3xl bg-brand px-6 py-10 text-center text-brand-foreground md:px-10">
          <h3 className="mx-auto max-w-[22ch] text-balance font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Sua próxima entrega começa com a moto certa.
          </h3>
          <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-brand-foreground/75">
            Cadastro pelo celular, análise em até 24h e retirada com contrato digital.
          </p>
          <CtaLink
            to="/cadastro"
            size="lg"
            className="mt-6 bg-white font-semibold text-brand hover:bg-white/90"
          >
            Quero alugar uma moto
          </CtaLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
