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
import { NextApiRequest, NextApiResponse } from "next";

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

export function verifyToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key",
    );

    const userId = (decodedToken as { id: string }).id;

    return userId;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        throw new Error(
          "El token ha expirado. Por favor, inicia sesión de nuevo.",
        );
      }
    }
    throw new Error("Error desconocido al verificar el token.");
  }
}
