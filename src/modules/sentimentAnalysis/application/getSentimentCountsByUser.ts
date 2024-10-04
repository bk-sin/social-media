import { getSentimentCountsByUser as getSentimentCountsByUserService } from "../infra/sentimentAnalysisService";

export const getSentimentCountsByUser = async (userId: string) => {
  const sentiment = await getSentimentCountsByUserService(Number(userId));

  if (!sentiment) {
    throw new Error("Sentiment analysis failed");
  }

  return sentiment;
};
