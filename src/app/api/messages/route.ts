// src/app/api/messages/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        sender: true, // Récupère les infos de l'utilisateur
      },
    });

    const formattedMessages = messages.map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      senderPseudo: message.sender.username,
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { pseudo, message } = await req.json();

    if (!pseudo || !message) {
      return NextResponse.json({ error: "Le pseudo et le message sont requis." }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        content: message,
        sender: {
          connectOrCreate: {
            where: { username: pseudo },
            create: { username: pseudo },
          },
        },
      },
      include: {
        sender: true,
      },
    });

    return NextResponse.json({
      id: newMessage.id,
      content: newMessage.content,
      createdAt: newMessage.createdAt,
      senderPseudo: newMessage.sender.username,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création du message." }, { status: 500 });
  }
}
