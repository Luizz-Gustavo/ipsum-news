import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategoriesActive = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            where: { 
                status: true 
            },
            include: {
                posts: true
            }
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} 