import { UserRepository } from "@/modules/users/domain/UserRepository";
import { createAPIUserRepository } from "@/modules/users/infra/prismaUserRepository";
import type { NextApiRequest, NextApiResponse } from "next";

const userRepository = createAPIUserRepository() as UserRepository;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  if (req.method === "GET") {
    try {
      const user = await userRepository.getById(parseInt(id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
