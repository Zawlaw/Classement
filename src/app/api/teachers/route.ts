import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { votes: 'desc' },
    });
    return NextResponse.json(teachers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
