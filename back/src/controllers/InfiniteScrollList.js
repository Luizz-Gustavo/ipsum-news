import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const InfiniteScrollList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      skip: parseInt(skip, 10),
      take: parseInt(limit, 10),
      where: { status: true },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true
      },
    });

    const totalPosts = await prisma.post.count({
      where: { status: true },
    });
    const hasMore = page * limit < totalPosts;

    res.json({
      posts,
      hasMore,
    });
  } catch (error) {
    console.error('Erro ao recuperar postagens:', error);
    res.status(500).json({ error: 'Erro ao recuperar postagens!' });
  }
};