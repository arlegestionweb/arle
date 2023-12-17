import { z } from "zod";
import { gafasLujoSchema, gafasPremiumSchema, perfumeLujoSchema, perfumePremiumSchema, relojLujoSchema, relojPremiumSchema } from "./zodSchemas";

export type TPerfumePremium = z.infer<typeof perfumePremiumSchema>;
export type TPerfumeLujo = z.infer<typeof perfumeLujoSchema>;
export type TRelojPremium = z.infer<typeof relojPremiumSchema>;
export type TRelojLujo = z.infer<typeof relojLujoSchema>;
export type TGafaLujo = z.infer<typeof gafasLujoSchema>;
export type TGafaPremium = z.infer<typeof gafasPremiumSchema>;

const zodProductPremium = z.union([perfumePremiumSchema, relojPremiumSchema, gafasPremiumSchema]);
export type TProductPremium = z.infer<typeof zodProductPremium>;

const zodProductLujo = z.union([perfumeLujoSchema, relojLujoSchema, gafasLujoSchema]);
export type TProductLujo = z.infer<typeof zodProductLujo>;


// export const isPerfume = (product: TProduct): product is TPerfume => product.type.includes("perfume"); 
export const isPerfumePremium = (product: TProductPremium): product is TPerfumePremium => product._type.includes("perfumePremium"); 

export const isPerfumeLujo = (product: TProductLujo): product is TPerfumeLujo => product._type.includes("perfumeLujo"); 