import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ status: "error", message: "Token não fornecido" });

  try {
    const jwtSecret = process.env.JWT_SECRET;
    const tokenValue = token.split(" ")[1];

    if (!jwtSecret)
      throw new Error("JWT_SECRET não definido");

    const decoded = jwt.verify(tokenValue, jwtSecret);

    req.user = decoded as { userId: string; cpf: string; role: string, hospitalId: string };

    next();
  } catch (error) {
    return res.status(403).json({ status: "error", message: "Token inválido" });
  }
}
