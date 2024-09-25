export interface SentimentScore {
  positive: number;
  negative: number;
  neutral: number;
}

export interface SentimentAnalysisService {
  analyze(text: string, config?: ModelConfig): Promise<SentimentScore | null>;
}

export interface ModelConfig {
  model?: string;
  prompt?: (text: string) => string;
}

export const defaultConfig = {
  prompt: (
    text: string,
  ) => `Analyze the following text and provide a sentiment score as a JSON object. The sentiment score should be a float between 0 and 1, where 0 represents a negative sentiment (including toxic, racist, or harmful language), 0.5 represents a neutral sentiment, and 1 represents a positive sentiment.

Use this JSON schema:

{ "positive": 0.4, "negative": 0.5, "neutral": 0.1 }

Please do not include any explanations or additional comments; just return the JSON. The text to analyze is: "${text}". Ensure the text is a review, opinion piece, or similar content for accurate sentiment analysis.`,
  model: "gemini-1.5-flash",
};
