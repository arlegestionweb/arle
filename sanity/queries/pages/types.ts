import { z } from "zod";
import { perfumeLujoSchema, perfumePremiumSchema } from "./zodSchemas/perfume";
import { relojLujoSchema, relojPremiumSchema } from "./zodSchemas/reloj";
import { gafasLujoSchema, gafasPremiumSchema } from "./zodSchemas/gafas";

export type TPerfumePremium = z.infer<typeof perfumePremiumSchema>;
export type TPerfumeLujo = z.infer<typeof perfumeLujoSchema>;
export type TRelojPremium = z.infer<typeof relojPremiumSchema>;
export type TRelojLujo = z.infer<typeof relojLujoSchema>;
export type TGafaLujo = z.infer<typeof gafasLujoSchema>;
export type TGafaPremium = z.infer<typeof gafasPremiumSchema>;

const zodProductPremiun = z.union([perfumePremiumSchema, relojPremiumSchema, gafasPremiumSchema]);
export type TProductPremiun = z.infer<typeof zodProductPremiun>;


// export const isPerfume = (product: TProduct): product is TPerfume => product.type.includes("perfume"); 
export const isPerfumePremium = (product: TProductPremiun): product is TPerfumePremium => product._type.includes("perfumePremium"); 