import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    if (name.length < 3) {
        return res.status(400).json({ error: 'Name must be at least 3 characters long' });
    }

    if (name.length > 100) {
        return res.status(400).json({ error: 'Name must be less than 100 characters long' });
    }

    try {
        const existingCategory = await prisma.category.findFirst({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ error: 'This category already exists' });
        }

        const slug = slugify(name, { lower: true });
        const category = await prisma.category.create({ 
            data: { 
                name,
                slug 
            } 
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}