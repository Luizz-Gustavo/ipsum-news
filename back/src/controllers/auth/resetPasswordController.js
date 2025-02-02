import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        
        if (!newPassword) {
            return res.status(400).json({ error: 'New password is required' });
        }
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetEntry = await prisma.passwordResetCode.findFirst({
            where: {
                userId: user.id,
                code,
                expiresAt: { gt: new Date() }
            }
        });
    
        if (!resetEntry) {
            return res.status(400).json({ error: 'Invalid or expired code' });
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });
    
        await prisma.passwordResetCode.delete({
            where: { id: resetEntry.id }
        });
    
        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Error in password reset:', error);
        res.status(500).json({ error: 'Error resetting password.' });
    }
};
