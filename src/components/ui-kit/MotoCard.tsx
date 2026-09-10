import { getMotoImage } from "@/data/moto-images";
import { brl } from "@/lib/format";
import type { Moto } from "@/lib/types";
import { MotoStatusPill } from "./StatusPill";

export function MotoCard({ moto }: { moto: Moto }) {
  return (
    <article className="group surface overflow-hidden rounded-2xl transition-shadow duration-200 hover:shadow-[0_12px_32px_oklch(0.23_0.035_255_/_0.08)]">
      <div className="relative overflow-hidden">
        <img
          src={getMotoImage(moto.id)}
          alt={`${moto.modelo} ${moto.ano}`}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3">
          <MotoStatusPill status={moto.status} />
        </div>
      </div>
      <div className="p-5">
        <p className="font-display text-lg font-semibold tracking-tight">{moto.modelo}</p>
        <p className="mt-0.5 text-sm text-steel">
          {moto.ano} · {moto.cilindrada}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              {brl(moto.valorSemanal)}
              <span className="text-sm font-medium text-steel">/sem</span>
            </p>
            <p className="text-sm text-steel">{brl(moto.valorMensal)}/mês</p>
          </div>
          <a
            href="/cadastro"
            className="text-sm font-semibold text-brand transition-colors hover:text-ink"
          >
            Alugar
          </a>
        </div>
      </div>
    </article>
  );
}
