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
  console.log({wompyJson })

  if (wompyJson.error) {
    return redirect(`/payment-error?error=${wompyJson.error}`);
  }

  if (wompyJson.data.status === "APPROVED") {
    const responseUrl = `/success/${params.paymentId}/${wompyPaymentId}`;
    return redirect(responseUrl);
  }

  return (
    <Main extraClasses="pt-10 bg-white">

      <h1>{JSON.stringify(wompyPaymentId)}</h1>
      <h1>{JSON.stringify(wompyQueryUrl)}</h1>
      <span>{JSON.stringify(wompyJson)}</span>
    </Main>
  )
}

export default Page;


// "use client"

// import { useSearchParams } from "next/navigation";

// function Page({
//   params,
// }: {
//   params: { paymentId: string }
// }) {

//   const searchParams = useSearchParams();
//   return <h1>{JSON.stringify(searchParams)}</h1>
// }

// export default Page;