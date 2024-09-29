import { z } from "zod";

export const postSchema = z.object({
  userId: z.number().min(1, "User ID is required"),
  content: z.string().min(1, "Content is required"),
});

export type Post = z.infer<typeof postSchema>;
