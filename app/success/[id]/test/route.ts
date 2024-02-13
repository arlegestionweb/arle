export const GET = async (
  req: Request,
) => { 

  return Response.json({
    url: req.url,
  });
};
