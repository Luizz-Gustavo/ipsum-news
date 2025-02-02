import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seed = async () => {
    try {
        const role = await prisma.role.createMany({
            data: [
                { name: "administrator", id: 1 },
                { name: "writer", id: 2 },
                { name: "reader", id: 3 },
            ]
        });

        const categories = await prisma.category.createMany({
            data: [
                { name: "Science and Technology", slug: "science-and-technology" },
                { name: "Health", slug: "health" },
                { name: "Education", slug: "education" },
                { name: "Sports", slug: "sports" },
                { name: "Politics", slug: "politics" },
                { name: "Economy", slug: "economy" },
                { name: "Culture", slug: "culture" },
                { name: "Music", slug: "music" },
                { name: "Fashion", slug: "fashion" },
                { name: "Games", slug: "games" },
                { name: "Automotive", slug: "automotive" },
            ]
        });

        const adminPassword = "admin123";
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const user = await prisma.user.create({
            data: {
                name: 'ipsum',
                lastName: 'news',
                nickname: 'ipsumnews',
                email: 'ipsumnews@email.com',
                password: hashedPassword,
                roleId: 1,
            }
        });

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seed();