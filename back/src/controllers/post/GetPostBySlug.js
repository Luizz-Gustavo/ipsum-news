import { PrismaClient } from "@prisma/client";
import { incrementPostViews } from '../../services/viewsService.js';

const prisma = new PrismaClient();

export const getPostBySlug = async (req, res) => {
  const { category, slug } = req.params;
  
  const ip = req.ip;
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  try {
    const post = await prisma.post.findFirst({ 
      where: { 
        slug,
        category: {
          slug: category
        }
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            lastName: true,
            nickname: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Call the service to increment views
    await incrementPostViews(post.id, ip, userAgent);
    
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ 
      message: 'Error fetching the post', 
      error: error.message 
    });
  }
};