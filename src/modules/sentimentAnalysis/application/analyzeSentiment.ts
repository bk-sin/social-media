import { Post } from "@/store/posts";
import { defaultConfig } from "../domain";
import { analyzeSentiment as analyzeSentimentService } from "../infra/sentimentAnalysisService";

export const analyzeSentiment = async (
  text: string,
  postData: Post,
  config = defaultConfig,
) => {
  const sentiment = await analyzeSentimentService(text, config, postData);

  if (!sentiment) {
    throw new Error("Sentiment analysis failed");
  }

  return sentiment;
};
