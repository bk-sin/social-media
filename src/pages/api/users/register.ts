import { createUser } from "@/modules/users/application/createUser";
import { UserDataToRegister } from "@/modules/users/domain";
import { prismaUserRepository } from "@/modules/users/infra/prismaUserRepository";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    try {
      const userData = { username, email, password } as UserDataToRegister;
      const user = await createUser(prismaUserRepository, userData);
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
