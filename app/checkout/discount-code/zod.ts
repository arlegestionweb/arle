import { z } from "zod";

const zodApprovedApiResponse = z.object({
  status: z.literal(200),
  body: z.object({
    discountCode: z.object({
      codigo: z.string(),
      porcentaje: z.number(),
    }),
  }),
});

const zodRejectedApiResponse = z.object({
  status: z.literal(400),
  body: z.object({
    message: z.string(),
  }),
});

export const zodApiResponseSchema = z.union([
  zodApprovedApiResponse,
  zodRejectedApiResponse,
]);