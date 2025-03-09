import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
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
  }
}
