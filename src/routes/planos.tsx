import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PlanoCard } from "@/components/ui-kit/PlanoCard";
import { getPlanos } from "@/lib/mock-api";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e valores de locação — ViagemMot" },
      {
        name: "description",
        content:
          "Plano semanal, quinzenal e mensal com seguro, manutenção e suporte inclusos. Escolha o que cabe na sua rotina.",
      },
      { property: "og:title", content: "Planos e valores de locação — ViagemMot" },
      {
        property: "og:description",
        content: "Compare os planos semanal, quinzenal e mensal e veja o que está incluso.",
      },
    ],
  }),
  component: PlanosPage,
});

const inclusosGerais = [
  "Documentação e emplacamento em dia",
  "Rastreador instalado",
  "Assistência 24h em caso de pane",
  "Troca de moto em caso de manutenção longa",
];

function PlanosPage() {
  const planos = getPlanos();

  return (
    <SiteLayout>
      <section className="py-10">
        <h1 className="max-w-[24ch] text-balance font-display text-3xl font-semibold">
          Planos e valores
        </h1>
        <p className="mt-2 max-w-[52ch] text-pretty text-steel">
          Preço fechado, sem taxa escondida. Você troca de plano quando quiser, a partir do
          próximo ciclo.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {planos.map((plano) => (
            <PlanoCard key={plano.id} plano={plano} />
          ))}
        </div>
      </section>

      <section className="py-4 pb-16">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-xl font-semibold">Incluso em todos os planos</h2>
          <ul className="mt-4 grid gap-2 text-sm text-steel sm:grid-cols-2">
            {inclusosGerais.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
