import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
            include: { posts: true }
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (category.posts.length > 0) {
            return res.status(400).json({ 
                error: 'Cannot delete category with associated posts. Disable it instead.' 
            });
        }

        const deletedCategory = await prisma.category.delete({ 
            where: { id: Number(id) } 
        });
        res.status(200).json(deletedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} 