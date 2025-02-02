import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                nickname: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}