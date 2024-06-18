



export const POST = async (req: Request, res: Response) => {

  const request = await req.json()

  console.log({request, transaction: request.data.transaction})

  return new Response("Transacción exitosa", {status: 200});

}