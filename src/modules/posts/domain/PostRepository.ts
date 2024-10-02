import { Post } from "@prisma/client";

export interface PostRepository {
  create(post: Omit<Post, "id" | "createdAt">): Promise<Post>;
  getAll(): Promise<Post[]>;
  like(postId: number, userId: string | void): Promise<Post>;
}
