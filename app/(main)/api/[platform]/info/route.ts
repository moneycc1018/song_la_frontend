export async function GET(request: Request, { params }: { params: { platform: string } }) {
  const { platform } = params;
  const { search } = new URL(request.url);
  const baseUrl = process.env.API_URL;

  const res = await fetch(baseUrl + `/${platform}/info${search}`);
  const data = await res.json();

  return Response.json({ data });
}
