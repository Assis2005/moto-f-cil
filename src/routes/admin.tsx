import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { StatCard } from "@/components/ui-kit/StatCard";
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

  // Lê no cliente porque o mock guarda os envios locais no navegador.
  useEffect(() => {
    setCadastros(getCadastros());
  }, []);

  const totalMotos = getMotos().length;
  const pendentes = cadastros.filter((c) => c.status === "pendente").length;
  const aprovados = cadastros.filter((c) => c.status === "aprovado").length;

  return (
    <SiteLayout>
      <section className="py-10 pb-16">
        <h1 className="max-w-[30ch] text-balance font-display text-3xl font-semibold">
          Painel administrativo
        </h1>

        <div className="mb-4 mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total de cadastros" value={cadastros.length} />
          <StatCard label="Total de motos" value={totalMotos} />
          <StatCard label="Cadastros pendentes" value={pendentes} tone="warning" />
          <StatCard label="Cadastros aprovados" value={aprovados} tone="success" />
        </div>

        <div className="glass-strong overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-steel">
                  <th className="px-4 py-3 font-medium">Nome</th>
                  <th className="px-4 py-3 font-medium">CPF</th>
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {cadastros.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-3 font-medium">{c.nome}</td>
                    <td className="px-4 py-3 text-steel">{c.cpf}</td>
                    <td className="px-4 py-3 text-steel">{dataBR(c.data)}</td>
                    <td className="px-4 py-3">
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
