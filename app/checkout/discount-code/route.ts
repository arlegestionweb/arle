import { getAllDiscountCodes } from "@/sanity/queries/cart";
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


export const POST = async (req: Request) => {
  const body = await req.json();

  const availableDiscountCodes = await getAllDiscountCodes();

  const discountCode = availableDiscountCodes?.find(
    (discountCode) => discountCode.codigo === body.code
  );

  if (discountCode === undefined) {
    return Response.json({
      status: 404,
      body: {
        message: "Código de descuento inválido",
      },
    });
  }

  return Response.json({
    status: 200,
    body: {
      message: "DISCOUNT CODE FOUND",
      discountCode,
    },
  });
};
