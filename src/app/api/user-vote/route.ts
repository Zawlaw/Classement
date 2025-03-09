import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const headers = new Headers(req.headers);
    const userIP = headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const userAgent = headers.get("user-agent") || "";
    const userHash = crypto
      .createHash("sha256")
      .update(`${userIP}-${userAgent}`)
      .digest("hex");

    const existingVote = await prisma.vote.findUnique({ 
      where: { userHash } 
    });

    return NextResponse.json({ voted: !!existingVote });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}