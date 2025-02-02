import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import slugify from 'slugify';

dotenv.config();

const prisma = new PrismaClient();

export const NewPost = async (req, res) => {
  try {
    const { title, videoLink, categoryId, content, imageUrl, slug: incomingSlug } = req.body;
    const userId = req.user.id;

    const errors = [];

    if (!title) {
      errors.push('O título é obrigatório!');
    }

    if (title && title.length > 255) {
      errors.push('O título deve ter no máximo 255 caracteres!');
    }

    if (!categoryId) {
      errors.push('A categoria é obrigatória!');
    }

    if (!videoLink) {
      errors.push('O link do vídeo é obrigatório!');
    }

    if (!content) {
      errors.push('Certifique-se de fornecer o conteúdo da publicação!');
    }

    if (title) {
      const baseSlug = slugify(title, {
        lower: true,
        strict: true
      });

      let generatedSlug = baseSlug;
      let counter = 1;
      while (await prisma.post.findUnique({ where: { slug: generatedSlug } })) {
        generatedSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      if (!generatedSlug) {
        errors.push('Não foi possível gerar um slug válido para o título!');
      }

      req.body.slug = generatedSlug;
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        slug: req.body.slug,
        videoLink,
        categoryId,
        content,
        imageUrl,
        status: true,
        authorId: userId
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

    res.status(201).json(newPost);

  } catch (error) {
    res.status(500).json({ error: 'Erro desconhecido ao criar a postagem.', details: error.message });
  }
};