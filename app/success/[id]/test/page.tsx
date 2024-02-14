

function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <h1>{JSON.stringify(searchParams)}</h1>
}

export default Page;