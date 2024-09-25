import { GoogleGenerativeAI } from "@google/generative-ai";
import { defaultConfig } from "../domain";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY as string,
);

export const analyzeSentiment = async (
  text: string,
  config = defaultConfig,
) => {
  try {
    const model = genAI.getGenerativeModel({ model: config.model });
    const prompt = config.prompt(text);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();
    const sentiment = JSON.parse(responseText);

    return sentiment;
  } catch (error) {
    console.error("Error in API call:", error);
    return null;
  }
};
