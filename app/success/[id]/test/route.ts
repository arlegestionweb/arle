export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => { 

  return {
    url: req.url,
  }
};
