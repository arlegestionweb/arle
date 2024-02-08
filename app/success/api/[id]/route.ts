export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { searchParams } = new URL(req.url);
  const wompyPaymentId = searchParams.get("id");
  const isEnvDev = process.env.NODE_ENV === "development";

  
  const wompyQueryUrl = `https://${isEnvDev ? "sandbox" : "production"}.wompi.co/v1/transactions/${wompyPaymentId}`
  console.log({ wompyQueryUrl });

  const wompyResponse = await fetch(wompyQueryUrl, 
    // {
    // headers: {
    //   Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
    // },
  // }
  );

  const wompyJson = await wompyResponse.json();


  console.log({ wompyJson })

  if (wompyJson.data.status === "APPROVED") {
    
    
    return Response.json({
      message: "Success",
      status: 200,
    });
  
  }
  return Response.json({
    message: "Error",
    status: 400,
  });

};
