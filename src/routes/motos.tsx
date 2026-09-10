import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { MotoCard } from "@/components/ui-kit/MotoCard";
import { PageHeader } from "@/components/ui-kit/Section";
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
      <section className="py-10 md:py-14">
        <PageHeader
          eyebrow="Frota"
          title="Motos disponíveis"
          description="Frota revisada e pronta para trabalhar. Os valores já incluem seguro e manutenção do plano escolhido."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {motos.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
