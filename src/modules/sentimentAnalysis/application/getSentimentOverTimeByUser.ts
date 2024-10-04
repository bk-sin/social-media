import { getSentimentOverTimeByUser as getSentimentOverTimeByUserService } from "../infra/sentimentAnalysisService";

export const getSentimentOverTimeByUser = async (userId: string) => {
  const sentiment = await getSentimentOverTimeByUserService(Number(userId));

  if (!sentiment) {
    throw new Error("Sentiment analysis failed");
  }

  return sentiment;
};
