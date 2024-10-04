import { GoogleGenerativeAI } from "@google/generative-ai";
import { defaultConfig } from "../domain";
import prisma from "@/database/prismaClient";
import { Post } from "@/store/posts";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY as string,
);

export const analyzeSentiment = async (
  text: string,
  config = defaultConfig,
  postData: Post,
) => {
  try {
    const model = genAI.getGenerativeModel({ model: config.model });
    const prompt = config.prompt(text);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();
    const sentiment = JSON.parse(responseText);
    await prisma.sentimentAnalysis.create({
      data: {
        postId: postData.id,
        userId: postData.userId,
        positive: sentiment.positive,
        negative: sentiment.negative,
        neutral: sentiment.neutral,
      },
    });

    return sentiment;
  } catch (error) {
    console.error("Error in API call:", error);
    return null;
  }
};
