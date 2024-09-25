import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(
  payload: object,
  expiresIn: string = "1h",
): string {
  if (!JWT_SECRET) {
    throw new Error("No se ha definido el JWT_SECRET");
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): object | string {
  if (!JWT_SECRET) {
    throw new Error("No se ha definido el JWT_SECRET");
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
