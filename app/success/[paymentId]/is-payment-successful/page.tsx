import Main from "@/app/_components/Main";
import { redirect } from "next/navigation";


async function Page({
  params,
  searchParams,
}: {
  params: { paymentId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const wompyPaymentId = searchParams.id;

  const wompyQueryUrl = `https://${process.env.WOMPI_ENV}.wompi.co/v1/transactions/${wompyPaymentId}`;

  const wompyResponse = await fetch(wompyQueryUrl);

  
  const wompyJson = await wompyResponse.json();

  if (wompyJson.error) {
    return redirect(`/payment-error?error=${wompyJson.error}`);
  }

  if (wompyJson.data.status === "APPROVED") {
    const responseUrl = `/success/${params.paymentId}/${wompyPaymentId}`;
    return redirect(responseUrl);
  }

  return null;
}

export default Page;