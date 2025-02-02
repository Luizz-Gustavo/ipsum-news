import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const verifyPassword = async (req, res) => {
    try {
        const { userId, currentPassword } = req.body;

        if (!userId || !currentPassword) {
            return res.status(400).json({ 
                error: 'User ID and current password are required' 
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ 
                error: 'User not found' 
            });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: 'Invalid password' 
            });
        }

        res.status(200).json({ 
            verified: true, 
            message: 'Verified successfully' 
        });

    } catch (error) {
        console.error('Error verifying password:', error);
        res.status(500).json({ 
            error: 'Internal server error while verifying password' 
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({ 
                error: 'All fields are required' 
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ 
                error: 'User not found' 
            });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: 'Current password is incorrect' 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        res.status(200).json({ 
            message: 'Password changed successfully' 
        });

    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ 
            error: 'Internal server error while changing password' 
        });
    }
};