import type { FaqItem } from "@/lib/types";

export function FaqList({ itens }: { itens: FaqItem[] }) {
  return (
    <div className="surface divide-y divide-border overflow-hidden rounded-2xl">
      {itens.map((item) => (
        <details key={item.pergunta} className="group px-5 py-4">
          <summary className="cursor-pointer list-none font-display font-semibold marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {item.pergunta}
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-steel transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-steel">{item.resposta}</p>
        </details>
      ))}
    </div>
  );
}
