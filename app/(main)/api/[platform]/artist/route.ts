export async function GET(request: Request, { params }: { params: { platform: string } }) {
  const { platform } = params;
  const baseUrl = process.env.API_URL;

  const res = await fetch(baseUrl + `/${platform}/artists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  const data = await res.json();

  return Response.json({ data });
}
