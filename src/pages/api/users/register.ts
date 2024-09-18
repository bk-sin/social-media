import { UserDataCreate } from "@/modules/users/domain/UserDataCreate";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { createAPIUserRepository } from "@/modules/users/infra/APIUserRepository";
import type { NextApiRequest, NextApiResponse } from "next";

const userRepository = createAPIUserRepository() as UserRepository;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, password and email are required" });
    }

    try {
      const userData = { username, email, password } as UserDataCreate;
      const user = await userRepository.create(userData);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Failed to register user" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
