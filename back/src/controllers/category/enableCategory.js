import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const enableCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({ 
            where: { id: Number(id) } 
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (category.status) {
            return res.status(400).json({ error: 'Category is already enabled' });
        }
        
        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { 
                status: true,
                posts: {
                    updateMany: {
                        where: { categoryId: Number(id) },
                        data: { status: true }
                    }
                }
            },
            include: {
                posts: true
            }
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}