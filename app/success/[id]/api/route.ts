import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { sendInvoiceEmail } from "../actions";


export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { searchParams } = new URL(req.url);
  const wompyPaymentId = searchParams.get("id");

  const wompyQueryUrl = `https://${process.env.WOMPI_ENV}.wompi.co/v1/transactions/${wompyPaymentId}`;

  const localUrl = req.url.split("api")[0];
  try {
    const wompyResponse = await fetch(wompyQueryUrl);

    const wompyJson = await wompyResponse.json();
    console.log({ wompyJson, wompyQueryUrl });

    if (wompyJson.error) {
      return Response.json({
        wompyJson,
        wompyQueryUrl,
        wompyPaymentId,
        url: new URL(req.url).toString()
      });
    }

    if (wompyJson.data.status === "APPROVED") {
      const sanityOrder = await sanityClient.fetch(
        `*[_type == "orders" && _id == $id][0]`,
        { id: params.id }
      );

      const newSanityOrder = {
        ...sanityOrder,
        status: "PAID",
        wompiReference: wompyJson.data.id,
      };

      await sanityWriteClient
        .patch(newSanityOrder._id)
        .set(newSanityOrder)
        .commit();

      const responseUrl = `${localUrl}`;

      const { data, error } = await sendInvoiceEmail(newSanityOrder);
      console.log("after running sendInvoice Email", { data, error });

      if (error || !data) {
        Response.json({
          message:
            "Hubo un error enviando to factura a tu correo electronico por favor contactanos con tu numero de orden",
          status: 400,
          error,
          "numero-de-orden": newSanityOrder._id,
        });
      }

      return Response.redirect(responseUrl);
    }

    return Response.json({
      url: `${localUrl.split("/success")[0]}/error-procesando-pago`,
      wompyJson,
      wompyQueryUrl
    });
  } catch (error) {
    console.error({ error });
    return Response.json({
      url: `${localUrl.split("/success")[0]}/error-procesando-pago`,
      error,
      wompyQueryUrl,
      inCatch: true,
    });
  }
};
