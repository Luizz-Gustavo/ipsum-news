import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPostsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const foundCategory = await prisma.category.findUnique({
            where: { slug: category },
        });

        if (!foundCategory) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }
        
        const posts = await prisma.post.findMany({
            where: { categoryId: foundCategory.id, status: true },
            orderBy: { createdAt: 'desc' },
            include: { category: true },
        });

        res.status(200).json({ category: foundCategory, posts });
    } catch (error) {
        console.error('Erro ao buscar posts por categoria:', error);
        res.status(500).json({ error: 'Erro ao buscar posts por categoria.' });
    }
};