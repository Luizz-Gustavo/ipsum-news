import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DisablePostController = async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.update({
        where: { id: parseInt(id, 10) },
        data: { status: false },
    });

    res.status(200).json(post);
};