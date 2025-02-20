import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET 요청 - 모든 Client 조회 또는 특정 ID로 조회
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      // 특정 ID의 Client 조회
      const client = await prisma.client.findUnique({
        where: { id: Number(id) },
      });

      if (!client) {
        return NextResponse.json({ error: '해당 ID의 Client를 찾을 수 없습니다.' }, { status: 404 });
      }

      return NextResponse.json(client, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
