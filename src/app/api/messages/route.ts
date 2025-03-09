import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Assurez-vous d'importer correctement Prisma

// Récupérer tous les messages
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc', // Trie les messages par date (du plus récent au plus ancien)
      },
      include: {
        sender: true,  // Inclut les informations sur l'expéditeur (utilisateur)
      },
    });

    // Inclure le pseudo de l'expéditeur dans les messages
    const formattedMessages = messages.map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      senderPseudo: message.sender.username, // Récupérer le pseudo de l'expéditeur
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des messages" }, { status: 500 });
  }
}

// Créer un message
export async function POST(req: Request) {
  try {
    const { pseudo, message } = await req.json();

    if (!pseudo || !message) {
      return NextResponse.json({ error: "Le pseudo et le message sont requis." }, { status: 400 });
    }

    // Création du message dans la base de données
    const newMessage = await prisma.message.create({
      data: {
        content: message, // Contenu du message
        sender: {
          connectOrCreate: {
            where: { username: pseudo },  // Recherche ou crée l'utilisateur par son pseudo
            create: { username: pseudo }, // Crée un nouvel utilisateur s'il n'existe pas
          },
        },
      },
      include: {
        sender: true, // Inclut les informations de l'expéditeur (utilisateur)
      },
    });

    // Retourne les informations du message créé avec le pseudo
    return NextResponse.json({
      id: newMessage.id,
      content: newMessage.content,
      createdAt: newMessage.createdAt,
      senderPseudo: newMessage.sender.username, // Inclut le pseudo de l'expéditeur
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création du message." }, { status: 500 });
  }
}
