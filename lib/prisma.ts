import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 先嘗試取得已存在的 prisma，沒有的話才建立新的
const prisma = globalForPrisma.prisma || new PrismaClient();

// 如果不是 production，則將 prisma 存到 global
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
