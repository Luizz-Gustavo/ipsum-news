import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PostsList = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            lastName: true,
            nickname: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao recuperar postagens:', error);
    res.status(500).json({ error: 'Erro ao recuperar postagens!' });
  }
};