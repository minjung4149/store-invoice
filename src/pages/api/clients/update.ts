import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id, name, phone, note, isFavorite } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        const updatedClient = await prisma.client.update({
            where: { id },
            data: {
                name,
                phone,
                note,
                isFavorite,
                updateDate: new Date(),
            },
        });

        return res.status(200).json(updatedClient);
    } catch (error) {
        console.error('Error updating client:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
