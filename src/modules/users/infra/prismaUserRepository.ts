import prisma from "@/database/prismaClient";
import {
  UserDataToAuthenticate,
  UserDataToRegister,
  UserRepository,
} from "../domain";
import { generateToken, hashPassword, verifyPassword } from "@/utils/auth";
import { toUserDTO } from "../application/user.dto";

export const prismaUserRepository: UserRepository = {
  create: async (userData: UserDataToRegister) => {
    const { username, email, password } = userData;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      throw new Error(`User with this email or username already exists`);
    }
    const hashedPassword = await hashPassword(password);
    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      const token = generateToken({ id: user.id, username: user.username });
      return toUserDTO(user, token);
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  },
  authenticate: async (userData: UserDataToAuthenticate) => {
    const { username, email, password } = userData;

    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken({ id: user.id, username: user.username });

    return toUserDTO(user, token);
  },
  getById: async (id: number) => {
    const user = prisma.user.findUnique({ where: { id } });
    return user;
  },
};
