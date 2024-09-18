import { hashPassword, verifyPassword } from "@/utils/auth";
import { UserDataCreate } from "../domain/UserDataCreate";
import { User } from "../domain/UserModel";
import { UserRepository } from "../domain/UserRepository";
import prisma from "@/database/prismaClient";

export function createAPIUserRepository(): UserRepository {
  const create = async (userData: UserDataCreate): Promise<User> => {
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      throw new Error("Username, email and password are required");
    }

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
      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  };

  const authenticate = async (userData: UserDataCreate): Promise<User> => {
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      throw new Error("Username, email and password are required");
    }

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

    return user;
  };
  const getById = async (id: number): Promise<User | null> => {
    const user = prisma.user.findUnique({ where: { id } });
    return user;
  };

  return {
    create,
    getById,
    authenticate,
  };
}
