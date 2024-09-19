import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

export const loginSchema = z
  .object({
    username: z.string().min(3).max(30).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(30),
  })
  .refine((data) => data.username || data.email, {
    message: "Debes proporcionar un username o un email",
    path: ["username", "email"],
  })
  .refine((data) => !(data.username && data.email), {
    message: "Solo puedes proporcionar un username o un email, no ambos",
    path: ["username", "email"],
  });
