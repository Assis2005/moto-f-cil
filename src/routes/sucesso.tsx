import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { CtaLink } from "@/components/ui-kit/CtaLink";

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
        <div className="surface w-full max-w-lg rounded-3xl p-8 text-center md:p-10">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-success-soft text-success">
            <Check className="size-7" strokeWidth={2.4} />
          </div>
          <h1 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Cadastro enviado e em análise.
          </h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-steel">
            Nossa equipe confere seus documentos e responde em até 24 horas úteis pelo WhatsApp
            informado.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink to="/motos" className="font-semibold">
              Ver motos disponíveis
            </CtaLink>
            <CtaLink to="/" variant="outline" className="font-semibold">
              Voltar ao início
            </CtaLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
