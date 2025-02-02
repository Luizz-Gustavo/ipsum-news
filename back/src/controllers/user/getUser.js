import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserByNickname = async (req, res) => {
    try {
        const { nickname } = req.params;

        if (!nickname) {
            return res.status(400).json({ error: 'Invalid nickname' });
        }

        const user = await prisma.user.findUnique({ 
            where: { nickname },
            include: { role: true }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, roleId, ...userWithoutSensitiveData } = user;
        userWithoutSensitiveData.role = user.role.name;

        res.status(200).json(userWithoutSensitiveData);
    } catch (error) {
        console.error('Error fetching user by nickname:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getUserActive = async (req, res) => {
    try {
        const activeUsers = await prisma.user.findMany({ 
            where: { status: true },
        });

        if (activeUsers.length === 0) {
            return res.status(404).json({ error: 'No active users found' });
        }

        res.status(200).json(activeUsers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getUserInactive = async (req, res) => {
    try {
        const inactiveUsers = await prisma.user.findMany({ 
            where: { status: false },
        });

        if (inactiveUsers.length === 0) {
            return res.status(404).json({ error: 'No inactive users found' });
        }

        res.status(200).json(inactiveUsers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}