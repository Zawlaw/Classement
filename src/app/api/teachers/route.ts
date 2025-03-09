// src/app/api/teachers/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    await prisma.$connect(); // Connexion explicite

    const teachers = await prisma.teacher.findMany({
      orderBy: { votes: 'desc' },
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des professeurs' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Déconnexion explicite
  }
}