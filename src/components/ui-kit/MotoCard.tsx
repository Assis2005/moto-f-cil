import { getMotoImage } from "@/data/moto-images";
import { brl } from "@/lib/format";
import type { Moto } from "@/lib/types";
import { MotoStatusPill } from "./StatusPill";

export function MotoCard({ moto }: { moto: Moto }) {
  return (
    <article className="glass overflow-hidden rounded-2xl">
      <img
        src={getMotoImage(moto.id)}
        alt={`${moto.modelo} ${moto.ano}`}
        loading="lazy"
        width={1024}
        height={768}
        className="aspect-4/3 w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-semibold">{moto.modelo}</p>
          <MotoStatusPill status={moto.status} />
        </div>
        <p className="text-xs text-steel">
          Ano {moto.ano} · {moto.cilindrada}
        </p>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-lg font-semibold">
            {brl(moto.valorSemanal)}
            <span className="text-sm font-medium">/sem</span>
          </span>
          <span className="text-sm text-steel">{brl(moto.valorMensal)}/mês</span>
        </div>
      </div>
    </article>
  );
}
