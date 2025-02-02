import NodeCache from 'node-cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define TTL for 10 minutes (600 seconds)
const viewCache = new NodeCache({ stdTTL: 600 });

/**
 * incrementPostViews 
 * @param {number} postId - ID of the post.
 * @param {string} ip - User's IP address.
 * @param {string} userAgent - User's User-Agent.
 */

export const incrementPostViews = async (postId, ip, userAgent) => {
    // Generate a unique key based on postId, IP, and User-Agent
    const cacheKey = `post:${postId}:ip:${ip}:ua:${userAgent}`;

    // Check if the key already exists in the cache
    const hasViewed = viewCache.get(cacheKey);

    if (!hasViewed) {
        try {
            // Increment the 'views' field in the 'Post' table
            await prisma.post.update({
                where: { id: postId },
                data: { views: { increment: 1 } },
            });

            // Set the key in the cache to avoid multiple increments within the TTL
            viewCache.set(cacheKey, true);
        } catch (error) {
            console.error('Error incrementing views:', error);
        }
    }
};