import { NextRequest } from 'next/server';

export const GET = async (
  req: NextRequest,
) => { 

  return Response.json({
    url: req.url,
    nextUrl: req.nextUrl,
  });
};
