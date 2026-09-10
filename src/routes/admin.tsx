import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { StatCard } from "@/components/ui-kit/StatCard";
import { PageHeader } from "@/components/ui-kit/Section";
import { CadastroStatusPill } from "@/components/ui-kit/StatusPill";
import { dataBR } from "@/lib/format";
import { getCadastros, getMotos } from "@/lib/mock-api";
import type { Cadastro } from "@/lib/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — ViagemMot" },
      {
        name: "description",
        content: "Visão geral dos cadastros recebidos, status de análise e tamanho da frota.",
      },
      { property: "og:title", content: "Painel administrativo — ViagemMot" },
      { property: "og:description", content: "Cadastros, motos e status de análise em um lugar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);

  useEffect(() => {
    setCadastros(getCadastros());
  }, []);

  const totalMotos = getMotos().length;
  const pendentes = cadastros.filter((c) => c.status === "pendente").length;
  const aprovados = cadastros.filter((c) => c.status === "aprovado").length;

  return (
    <SiteLayout>
      <section className="py-10 pb-16 md:py-14">
        <PageHeader
          eyebrow="Operação"
          title="Painel administrativo"
          description="Acompanhe cadastros recebidos, status de análise e o tamanho da frota."
        />

        <div className="mb-6 mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total de cadastros" value={cadastros.length} />
          <StatCard label="Total de motos" value={totalMotos} />
          <StatCard label="Cadastros pendentes" value={pendentes} tone="warning" />
          <StatCard label="Cadastros aprovados" value={aprovados} tone="success" />
        </div>

        <div className="surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-left text-[11px] uppercase tracking-[0.12em] text-steel">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">CPF</th>
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cadastros.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-secondary/40">
                    <td className="px-4 py-3.5 font-medium">{c.nome}</td>
                    <td className="px-4 py-3.5 text-steel">{c.cpf}</td>
                    <td className="px-4 py-3.5 text-steel">{dataBR(c.data)}</td>
                    <td className="px-4 py-3.5">
                      <CadastroStatusPill status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
