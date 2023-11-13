import { z } from "zod";
import { perfumeLujoSchema, perfumePremiumSchema, relojLujoSchema, relojPremiumSchema } from "./zodSchemas";

export type TPerfumePremium = z.infer<typeof perfumePremiumSchema>;
export type TPerfumeLujo = z.infer<typeof perfumeLujoSchema>;
export type TRelojPremium = z.infer<typeof relojPremiumSchema>;
export type TRelojLujo = z.infer<typeof relojLujoSchema>;