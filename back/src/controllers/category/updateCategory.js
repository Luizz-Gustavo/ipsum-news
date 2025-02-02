import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    try {
        const existingCategory = await prisma.category.findUnique({ 
            where: { id: Number(id) } 
        });
        
        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        if (name.length < 3) {
            return res.status(400).json({ error: 'Name must be at least 3 characters long' });
        }

        if (name.length > 100) {
            return res.status(400).json({ error: 'Name must be less than 100 characters long' });
        }

        const nameExists = await prisma.category.findFirst({
            where: { 
                AND: [
                    { name },
                    { id: { not: Number(id) } }
                ]
            }
        });

        if (nameExists) {
            return res.status(400).json({ error: 'A category with this name already exists' });
        }

        const category = await prisma.category.update({ 
            where: { id: Number(id) }, 
            data: { name } 
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} 