import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllHighlights = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                status: true
            },
            include: {
                category: true
            },
            orderBy: {
                views: 'desc'
            }
        });

        res.json(posts);
    } catch (error) {
        console.error('Error fetching all highlights:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getHighlights = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                status: true
            },
            include: {
                category: true
            },
            orderBy: {
                views: 'desc'
            },
            take: 3
        });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching highlights:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getHighlightsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const posts = await prisma.post.findMany({
            where: {
                category: {
                    name: category
                },
                status: true
            },
            orderBy: {
                views: 'desc'
            },
        });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching highlights by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}