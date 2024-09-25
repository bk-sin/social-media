import { defaultConfig } from "../domain";
import { analyzeSentiment as analyzeSentimentService } from "../infra/sentimentAnalysisService";

export const analyzeSentiment = async (
  text: string,
  config = defaultConfig,
) => {
  const sentiment = await analyzeSentimentService(text, config);

  if (!sentiment) {
    throw new Error("Sentiment analysis failed");
  }

  return sentiment;
};
