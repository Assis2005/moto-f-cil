import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { MotoCard } from "@/components/ui-kit/MotoCard";
import { getMotos } from "@/lib/mock-api";

export const Route = createFileRoute("/motos")({
  head: () => ({
    meta: [
      { title: "Motos disponíveis para locação — ViagemMot" },
      {
        name: "description",
        content:
          "Confira a frota disponível: modelo, ano, valor semanal, valor mensal e status de cada moto.",
      },
      { property: "og:title", content: "Motos disponíveis para locação — ViagemMot" },
      {
        property: "og:description",
        content: "Frota atualizada com valores semanais e mensais para entregadores de app.",
      },
    ],
  }),
  component: MotosPage,
});

function MotosPage() {
  const motos = getMotos();

  return (
    <SiteLayout>
      <section className="py-10">
        <h1 className="max-w-[24ch] text-balance font-display text-3xl font-semibold">
          Motos disponíveis
        </h1>
        <p className="mt-2 max-w-[52ch] text-pretty text-steel">
          Frota revisada e pronta para trabalhar. Os valores já incluem seguro e manutenção do
          plano escolhido.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {motos.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
