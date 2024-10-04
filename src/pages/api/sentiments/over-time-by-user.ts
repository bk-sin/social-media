import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/auth";
import { getSentimentOverTimeByUser } from "@/modules/sentimentAnalysis/application/getSentimentOverTimeByUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userId = verifyToken(req, res);
    if (!userId) return;
    const attachment = await getSentimentOverTimeByUser(userId);

    res.status(201).json(attachment);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}
