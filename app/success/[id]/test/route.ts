export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => { 

  return Response.json({
    url: req.url,
  });
};
