import { NextApiRequest, NextApiResponse } from "next";
import { createPost } from "@/modules/posts/application/createPost";
import { PrismaPostRepository } from "@/modules/posts/infra/prismaPostRepository";
import { verifyToken } from "@/utils/auth";

const postRepository = new PrismaPostRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userId = verifyToken(req, res);
    const postData = req.body;

    const post = await createPost(postRepository, { ...postData, userId });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}
