import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const disableUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.status) {
            return res.status(400).json({ error: 'User already disabled' });
        }

        const updatedUser = await prisma.user.update({ 
            where: { id: Number(id) }, 
            data: { status: false } 
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} 