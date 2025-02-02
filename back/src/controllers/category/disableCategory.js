import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const disableCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({ 
            where: { id: Number(id) } 
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (!category.status) {
            return res.status(400).json({ error: 'Category is already disabled' });
        }

        // Update category and all its posts to disabled status
        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { 
                status: false,
                posts: {
                    updateMany: {
                        where: { categoryId: Number(id) },
                        data: { status: false }
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