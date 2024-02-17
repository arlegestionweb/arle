import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { sendInvoiceEmail } from "../actions";
import { getProductsByIds } from "@/sanity/queries/pages/productPage";
import { TProductType } from "@/app/_components/navbar/menu";
import { fetchWithRetry } from "@/app/_lib/utils";
import { revalidatePath } from "next/cache";

export const GET = async (
  req: Request,
  { params }: { params: { paymentId: string; wompyPaymentId: string } }
) => {
  if (!req || !req.url) return Response.json({ message: "no req" });

  const url = req.url;
  // const { searchParams } = new URL(req.url);
  const { wompyPaymentId } = params;

  const wompyQueryUrl = `https://${process.env.WOMPI_ENV}.wompi.co/v1/transactions/${wompyPaymentId}`;

  try {
    const wompyResponse = await fetchWithRetry(wompyQueryUrl);

    const wompyJson = await wompyResponse.json();

    if (wompyJson.error) {
      return Response.json({
        wompyJson,
        wompyQueryUrl,
        wompyPaymentId,
        urlString: new URL(req.url).toString(),
        url,
        req,
      });
    }

    if (wompyJson.data.status === "APPROVED") {
      const sanityOrder = await sanityClient.fetch(
        `*[_type == "orders" && _id == $id][0]`,
        { id: params.paymentId }
      );

      // console.log({ sanityOrder });

      const newSanityOrder = {
        ...sanityOrder,
        status: "PAID",
        wompiReference: wompyJson.data.id,
      };
      // return Response.json(newSanityOrder);

      //   // console.log({ newSanityOrder, item: newSanityOrder.items[0] });

        const updateSanityOrder = await sanityWriteClient
          .patch(newSanityOrder._id)
          .set(newSanityOrder)
          .commit();

        const cartItemProducts = newSanityOrder.items.map(
          (item: {
            productId: { _ref: string };
            productType: TProductType;
            variantId: string;
            quantity: number;
          }) => {
            return {
              _id: item.productId._ref,
              _type: item.productType,
              variantId: item.variantId,
              quantity: item.quantity,
            };
          }
        );

        const productsToUpdate = await getProductsByIds(cartItemProducts);

        if (!productsToUpdate) {
          return Response.json({
            url: `${req.url.split("/success")[0]}/error-procesando-pago`,
            wompyJson,
            wompyQueryUrl,
          });
        }

        // console.log({ productsToUpdate, variante: productsToUpdate[0].variantes });
        for (const product of cartItemProducts) {
          const productToUpdate = productsToUpdate.find(
            (p) => p._id === product._id
          );

          if (productToUpdate) {
            const variantToUpdate = productToUpdate.variantes.find(
              (v) => v.codigoDeReferencia === product.variantId
            );

            if (!variantToUpdate) {
              return Response.json({
                url: `${req.url.split("/success")[0]}/error-procesando-pago`,
                wompyJson,
                wompyQueryUrl,
                error: "variant not found"
              });
            }

            const newVariantInfo = {...variantToUpdate, unidadesDisponibles: variantToUpdate.unidadesDisponibles - product.quantity};

            const variantIndex = productToUpdate.variantes.indexOf(variantToUpdate);
            // console.log("here", { newVariantInfo, variantIndex, oldVariant: productToUpdate.variantes[variantIndex] });
            const updateProduct = await sanityWriteClient
              .patch(productToUpdate._id)
              .set({ [`variantes[${variantIndex}].unidadesDisponibles`]: newVariantInfo.unidadesDisponibles })
              .commit();
          }
        }
        const urlSegments = req.url.split("/");
        urlSegments?.pop();
        const responseUrl = urlSegments?.join("/");
        const { data, error } = await sendInvoiceEmail(newSanityOrder);

        if (error || !data) {
          return Response.redirect(`${responseUrl}?error=error-sending-email`);
        }
        revalidatePath("/listing")
        revalidatePath("/[type]/[id]/page")
        return Response.redirect(responseUrl);
    }

    return Response.json({
      url: `${req.url.split("/success")[0]}/error-procesando-pago`,
      wompyJson,
      wompyQueryUrl,
    });
  } catch (error) {
    return Response.json({
      url: `${req.url.split("/success")[0]}/error-procesando-pago`,
      error,
      wompyQueryUrl,
      inCatch: true,
    });
  }
};
