import type { FaqItem } from "@/lib/types";

export function FaqList({ itens }: { itens: FaqItem[] }) {
  return (
    <div className="glass divide-y divide-ink/5 overflow-hidden rounded-2xl">
      {itens.map((item) => (
        <details key={item.pergunta} className="group p-5">
          <summary className="cursor-pointer list-none font-display font-semibold marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {item.pergunta}
              <span className="text-steel transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-2 text-sm text-steel">{item.resposta}</p>
        </details>
      ))}
    </div>
  );
}
