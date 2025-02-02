import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const deletedUser = await prisma.user.delete({ where: { id: Number(id) } });
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} 