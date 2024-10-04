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
          sentimentAnalysis: {
            select: {
              positive: true,
              negative: true,
              neutral: true,
            },
          },
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
        sentimentAnalysis: {
          select: {
            positive: true,
            negative: true,
            neutral: true,
          },
        },
      },
    });
  }

  async like(postId: number, userId: string | void): Promise<Post> {
    try {
      const existingLike = await prisma.like.findFirst({
        where: {
          postId: postId,
          userId: Number(userId),
        },
      });

      if (existingLike) {
        return await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likes: {
              delete: {
                id: existingLike.id,
              },
            },
          },
          include: {
            likes: true,
          },
        });
      }

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
          likes: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to like/dislike post: ${error}`);
    }
  }
}
