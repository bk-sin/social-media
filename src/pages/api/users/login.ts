import { NextApiResponse, NextApiRequest } from "next";
import { z } from "zod";

import { authenticate } from "@/modules/users/application/authUser";
import {
  UserDataToAuthenticate,
  UserDataAuthenticated,
} from "@/modules/users/domain";
import { prismaUserRepository } from "@/modules/users/infra/prismaUserRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const userData = { username, password } as UserDataToAuthenticate;
      const user: UserDataAuthenticated = await authenticate(
        prismaUserRepository,
        userData,
      );
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        return res.status(400).json({ error: firstError.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Failed to register user" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
