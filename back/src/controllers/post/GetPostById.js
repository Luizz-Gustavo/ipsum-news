import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({ where: { id: Number(id) } });
        if (!post) {
            return res.status(404).json({ message: 'Publicação não encontrada' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a publicação', error: error.message });
    }
};