import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cleanupExpiredCodes = async () => {
    try {
        await prisma.passwordResetCode.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        });
    } catch (error) {
        console.error('[Cleanup Service] Error cleaning up expired codes:', error);
    }
};

// 24 hours in milliseconds
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000;

export const startCleanupService = () => {
    // run immediately on the first time
    cleanupExpiredCodes();
    
    // configure the interval to run every 24 hours
    setInterval(cleanupExpiredCodes, CLEANUP_INTERVAL);
};