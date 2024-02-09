import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { searchParams } = new URL(req.url);
  const wompyPaymentId = searchParams.get("id");
  const isEnvDev = process.env.NODE_ENV === "development";

  const wompyQueryUrl = `https://${
    isEnvDev ? "sandbox" : "production"
  }.wompi.co/v1/transactions/${wompyPaymentId}`;

  try {
    const wompyResponse = await fetch(wompyQueryUrl);

    const wompyJson = await wompyResponse.json();

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

      await sanityWriteClient.patch(newSanityOrder._id).set(newSanityOrder).commit();
      
      const localUrl = req.url.split("api")[0];
      const responseUrl = `${localUrl}${params.id}`;

      return Response.redirect(responseUrl);
    }
  } catch (error) {
    return Response.json({
      message: "Error",
      status: 400,
      error,
    });
  }
};
