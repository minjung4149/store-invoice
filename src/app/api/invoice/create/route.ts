import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST 요청 - Invoice 및 InvoiceDetail을 함께 등록
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { no, clientId, balance, payment, details } = body;

    if (!no || !clientId || !Array.isArray(details)) {
      return NextResponse.json({ error: '올바른 요청 데이터를 제공해야 합니다.' }, { status: 400 });
    }

    // 트랜잭션을 사용하여 Invoice 및 InvoiceDetail 저장
    const createdInvoice = await prisma.$transaction(async (tx) => {
      // Invoice 생성
      const invoice = await tx.invoice.create({
        data: {
          no,
          clientId,
          balance: balance ?? 0,
          payment: payment ?? 0,
        },
      });

      // InvoiceDetail 생성
      if (details.length > 0) {
        await tx.invoiceDetail.createMany({
          data: details.map((detail) => ({
            invoiceId: invoice.id,
            name: detail.name,
            quantity: detail.quantity ?? 1,
            price: detail.price ?? 0,
          })),
        });
      }

      // Invoice.balance 값이 있으면 Client의 balance 업데이트
      if (payment && payment > 0) {
        await tx.client.update({
          where: { id: clientId },
          data: {
            balance: balance ?? 0,
            updateDate: new Date(),
          },
        });
      }

      return invoice;
    });

    return NextResponse.json({ invoiceId: createdInvoice.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice with details:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}


// PUT 요청 - Invoice 및 InvoiceDetail 업데이트
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, balance, payment, details } = body;

    if (!id || !Array.isArray(details)) {
      return NextResponse.json({ error: '올바른 요청 데이터를 제공해야 합니다.' }, { status: 400 });
    }

    // 기존 Invoice 조회
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id },
      include: { details: true },
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: '해당 ID의 Invoice를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 트랜잭션을 사용하여 Invoice 및 InvoiceDetail 업데이트
    const updatedInvoice = await prisma.$transaction(async (tx) => {
      // Invoice 업데이트
      const invoice = await tx.invoice.update({
        where: { id },
        data: {
          balance: balance ?? existingInvoice.balance,
          payment: payment ?? existingInvoice.payment,
          updateDate: new Date(),
        },
      });

      // 기존 InvoiceDetail 삭제 후 새로운 데이터 삽입
      await tx.invoiceDetail.deleteMany({ where: { invoiceId: id } });

      if (details.length > 0) {
        await tx.invoiceDetail.createMany({
          data: details.map((detail) => ({
            invoiceId: id,
            name: detail.name,
            quantity: detail.quantity ?? 1,
            price: detail.price ?? 0,
          })),
        });
      }

      return invoice;
    });

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    console.error('Error updating invoice with details:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
