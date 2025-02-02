import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyResetCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        
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
    
        res.status(200).json({ message: 'Code verified successfully' });
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ error: 'Error verifying code.' });
    }
};