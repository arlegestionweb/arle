

function Page({
  params,
  searchParams,
}: {
  params: { paymentId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const wompyPaymentId = searchParams.id;

  const wompyQueryUrl = `https://${process.env.WOMPI_ENV}.wompi.co/v1/transactions/${wompyPaymentId}`;

  return (
    <main>

      <h1>{JSON.stringify(wompyPaymentId)}</h1>
      <h1>{JSON.stringify(wompyQueryUrl)}</h1>
    </main>
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