import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/sucesso")({
  head: () => ({
    meta: [
      { title: "Cadastro enviado — ViagemMot" },
      {
        name: "description",
        content: "Seu cadastro foi enviado e está em análise. O retorno sai em até 24h úteis.",
      },
      { property: "og:title", content: "Cadastro enviado — ViagemMot" },
      { property: "og:description", content: "Cadastro em análise pela equipe ViagemMot." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SucessoPage,
});

function SucessoPage() {
  return (
    <SiteLayout>
      <section className="flex min-h-[60vh] items-center justify-center py-16">
        <div className="glass w-full max-w-lg rounded-2xl p-8 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-success-soft font-display text-xl font-semibold text-success">
            ✓
          </div>
          <h1 className="mt-5 text-balance font-display text-2xl font-semibold">
            Cadastro enviado com sucesso e está em análise.
          </h1>
          <p className="mt-3 text-pretty text-sm text-steel">
            Nossa equipe confere seus documentos e responde em até 24 horas úteis pelo WhatsApp
            informado.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/motos"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground ring-1 ring-brand/40"
            >
              Ver motos disponíveis
            </Link>
            <Link
              to="/"
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-steel ring-1 ring-ink/10"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
