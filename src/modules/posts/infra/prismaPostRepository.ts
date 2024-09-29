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
}
