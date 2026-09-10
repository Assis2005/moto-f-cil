import cg160 from "@/assets/moto-cg160.jpg";
import fazer250 from "@/assets/moto-fazer250.jpg";
import xre190 from "@/assets/moto-xre190.jpg";
import biz125 from "@/assets/moto-biz125.jpg";
import factor150 from "@/assets/moto-factor150.jpg";

/** Mapa id da moto -> imagem local. Ao integrar uma API, troque por URLs vindas do backend. */
export const motoImages: Record<string, string> = {
  "cg-160": cg160,
  "fazer-250": fazer250,
  "xre-190": xre190,
  "biz-125": biz125,
  "factor-150": factor150,
  "cg-160-2022": cg160,
};

export const getMotoImage = (id: string) => motoImages[id] ?? cg160;
