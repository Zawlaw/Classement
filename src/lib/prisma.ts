// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Évite la création de multiples instances de Prisma dans un environnement serverless
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log: ["query", "info", "warn", "error"], // Active les logs pour le débogage
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;