import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, phone, note, isFavorite } = req.body;

        // 필수 데이터 확인
        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required' });
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

        return res.status(201).json(newClient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}