import { NextApiRequest, NextApiResponse } from "next";
import { analyzeSentiment } from "../../modules/sentimentAnalysis/application/analyzeSentiment";
import { handleError } from "@/utils/errorHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  try {
    const sentiment = await analyzeSentiment(text);
    res.status(200).json(sentiment);
  } catch (err) {
    const errorMessage = handleError(err);
    console.error(errorMessage);
  }
}
