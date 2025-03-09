import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { teacherId } = await req.json();
    const headers = new Headers(req.headers);
    const userIP = headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const userAgent = headers.get("user-agent") || "";
    const userHash = crypto
      .createHash("sha256")
      .update(`${userIP}-${userAgent}`)
      .digest("hex");

    // Vérifier si l'utilisateur a déjà voté
    const existingVote = await prisma.vote.findUnique({ where: { userHash } });

    if (existingVote) {
      return NextResponse.json({ message: "You have already voted!" }, { status: 400 });
    }

    // Ajouter le vote
    await prisma.vote.create({
      data: { teacherId, userHash },
    });

    // Mettre à jour les votes de l'enseignant
    await prisma.teacher.update({
      where: { id: teacherId },
      data: { votes: { increment: 1 } },
    });

    return NextResponse.json({ message: "Vote registered!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
