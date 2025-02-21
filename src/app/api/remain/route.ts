import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET 요청 - 모든 Client의 최신 Invoice 정보 조회
export async function GET() {
  try {
    // 모든 Client 조회
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        balance: true,
        invoices: {
          orderBy: { createDate: 'desc' }, // 최신순 정렬
          take: 1, // 최신 Invoice 1개만 가져오기
          select: { createDate: true },
        },
      },
    });

    // 결과 데이터 변환 (각 Client에 대해 최신 Invoice 정보 포함)
    const result = clients.map(client => ({
      clientId: client.id,
      name: client.name,
      phone: client.phone,
      balance: client.balance,
      latestInvoiceDate: client.invoices.length > 0 ? client.invoices[0].createDate : null,
    }));

    return NextResponse.json({ clients: result }, { status: 200 });
  } catch (error) {
    console.error('Error fetching latest invoices for all clients:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
