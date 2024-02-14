

function Page({
  params,
  searchParams,
}: {
  params: { paymentId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <h1>{JSON.stringify(searchParams)}</h1>
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