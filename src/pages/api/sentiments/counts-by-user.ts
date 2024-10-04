import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/auth";
import { getSentimentCountsByUser } from "@/modules/sentimentAnalysis/application/getSentimentCountsByUser";

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
    const attachment = await getSentimentCountsByUser(userId);

    res.status(201).json(attachment);
  } catch (error) {
    console.error("Error getting sentiments over time by user:", error);
    res
      .status(500)
      .json({ error: "Failed to get sentiments over time by user" });
  }
}
