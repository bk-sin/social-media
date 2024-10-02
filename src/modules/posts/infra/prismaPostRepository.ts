import { PrismaClient } from "@prisma/client";
import { PostRepository } from "../domain/PostRepository";
import { Post } from "../domain/PostModel";

const prisma = new PrismaClient();

export class PrismaPostRepository implements PostRepository {
  async create(post: Post): Promise<Post> {
    try {
      return await prisma.post.create({
        data: {
          content: post.content,
          userId: post.userId,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create post: ${error}`);
    }
  }

  async getAll(): Promise<Post[]> {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        attachments: true,
        comments: true,
        likes: true,
        user: {
          select: {
            username: true,
            email: true,
            profile: {
              select: {
                fullName: true,
                bio: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async like(postId: number, userId: string | void): Promise<Post> {
    try {
      // Verificar si el usuario ya ha dado like al post
      const existingLike = await prisma.like.findFirst({
        where: {
          postId: postId,
          userId: Number(userId),
        },
      });

      // Si ya ha dado like, lo eliminamos (dislike)
      if (existingLike) {
        return await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likes: {
              delete: {
                id: existingLike.id, // Usar el ID del like existente para eliminarlo
              },
            },
          },
          include: {
            likes: true, // Retornar los likes actualizados
          },
        });
      }

      // Si no ha dado like, lo creamos
      return await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            create: {
              userId: Number(userId),
            },
          },
        },
        include: {
          likes: true, // Retornar los likes actualizados
        },
      });
    } catch (error) {
      throw new Error(`Failed to like/dislike post: ${error}`);
    }
  }
}
