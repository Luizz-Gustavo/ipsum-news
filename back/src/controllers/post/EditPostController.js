import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const EditPost = async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  let { title, videoLink, categoryId, content, status, imageUrl } = req.body;

  // Parsing do status de string para booleano
  if (typeof status === 'string') {
    switch (status.toLowerCase()) {
      case 'true':
        status = true;
        break;
      case 'false':
        status = false;
        break;
    }
  }

  // VALIDAÇÕES DE REQUISIÇÃO
  const errors = [];

  if (title && title.length > 255) {
    errors.push("O título deve ter no máximo 255 caracteres!");
  }

  if (status !== undefined && status !== null && typeof status !== "boolean") {
    errors.push("O campo status deve ser um valor booleano.");
  }

  if (categoryId !== undefined && categoryId !== null) {
    if (typeof categoryId !== 'number' && !Number.isInteger(Number(categoryId))) {
      errors.push("A categoria deve ser um número inteiro válido!");
    }
  }

  if (content && typeof content === 'string' && content.trim().length === 0) {
    errors.push("O conteúdo não pode ser vazio!");
  }

  if (errors.length > 0) {
    console.error("Erros de entrada:", errors);
    return res.status(400).json({ errors });
  }

  // Atualiza a postagem no banco de dados
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title || undefined,
        videoLink: videoLink || undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        content: content || undefined,
        status: status !== undefined ? status : undefined,
        imageUrl: imageUrl || undefined,
        updatedAt: new Date(),
      },
      include: {
        category: true
      }
    });

    // Buscar o post atualizado com todas as relações
    const postWithRelations = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        category: true
      }
    });

    res.json(postWithRelations);
  } catch (error) {
    console.error('Erro ao atualizar a postagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar a postagem!', details: error.message });
  }
};