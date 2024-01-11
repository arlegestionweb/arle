import { getAllDiscountCodes } from "@/sanity/queries/cart";


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
