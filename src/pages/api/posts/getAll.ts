import { NextApiRequest, NextApiResponse } from "next";
import { PrismaPostRepository } from "@/modules/posts/infra/prismaPostRepository";
import { verifyToken } from "@/utils/auth";
import { getPosts } from "@/modules/posts/application/getPosts";

const postRepository = new PrismaPostRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    verifyToken(req, res);

    const post = await getPosts(postRepository);
    res.status(200).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: `Failed to get posts: ${error}` });
  }
}
