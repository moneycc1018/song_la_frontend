export async function GET(request: Request, { params }: { params: { platform: string } }) {
  const { platform } = params;
  const type = new URL(request.url).searchParams.get("type");
  const baseUrl = process.env.API_URL;

  const res = await fetch(baseUrl + `/${platform}/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  const data = await res.json();

  return Response.json({ data });
}
