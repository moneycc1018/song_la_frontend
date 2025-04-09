import prisma from "@/lib/prisma";

export async function GET() {
  const result = await prisma.tag.findMany();

  return Response.json({ data: result });
}
