// pages/api/client.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const clients = await prisma.client.findMany();
            // clients가 null인 경우를 방지하기 위해 객체로 감싸서 반환합니다.
            return res.status(200).json({ clients });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res
            .status(405)
            .json({ error: `Method ${req.method} Not Allowed` });
    }
}
