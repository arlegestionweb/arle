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
  console.log({ wompyQueryUrl });

  try {
    const wompyResponse = await fetch(wompyQueryUrl);

    const wompyJson = await wompyResponse.json();

    console.log({ wompyJson });

    
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
        
        const updatedOrder = await sanityWriteClient
        .patch(newSanityOrder._id)
        .set(newSanityOrder)
        .commit();
        const localUrl = req.url.split("api")[0];
        const responseUrl = `${localUrl}${params.id}`;

      // return Response.json({
      //   message: "Success",
      //   status: 200,
      //   wompyJson,
      //   updatedOrder,
      //   responseUrl,
      // });

      return Response.redirect(
        responseUrl
      );
    }
    return Response.json({
      message: "Error",
      status: 400,
    });
  } catch (error) {
    return Response.json({
      message: "Error",
      status: 400,
      error,
    });
  }
};