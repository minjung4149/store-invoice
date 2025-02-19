import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST 요청 - 새로운 Client 생성
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, note, isFavorite } = body;

    // 필수 데이터 확인
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    // 데이터 생성
    const newClient = await prisma.client.create({
      data: {
        name,
        phone,
        note,
        isFavorite: isFavorite ?? false, // 기본값 설정
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
