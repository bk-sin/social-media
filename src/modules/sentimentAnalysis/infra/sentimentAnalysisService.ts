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

export const getSentimentCountsByUser = async (userId: number) => {
  try {
    const posts = await prisma.sentimentAnalysis.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        positive: true,
        negative: true,
        neutral: true,
      },
    });
    const sentimentCounts = posts.reduce(
      (acc, post) => {
        const { positive, negative, neutral } = post;
        if (positive >= negative && positive >= neutral) {
          acc.positive += 1;
        } else if (neutral >= positive && neutral >= negative) {
          acc.neutral += 1;
        } else {
          acc.negative += 1;
        }
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 },
    );

    return sentimentCounts;
  } catch (error) {
    throw new Error(`Failed to get sentiment counts: ${error}`);
  }
};

export const getSentimentOverTimeByUser = async (userId: number) => {
  const posts = await prisma.post.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sentimentAnalysis: true,
    },
  });

  return posts.filter((post) => post.sentimentAnalysis?.length > 0);
};
