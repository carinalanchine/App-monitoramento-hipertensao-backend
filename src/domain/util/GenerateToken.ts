import jwt from "jsonwebtoken";

export function generateToken(userId: string, cpf: string, role: string, hospitalId: string) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret)
    throw new Error("JWT_SECRET não definido");

  const accessToken = jwt.sign({ userId, cpf, role, hospitalId }, jwtSecret, { expiresIn: 60, });
  const refreshToken = jwt.sign({ userId, cpf, role, hospitalId }, jwtSecret, { expiresIn: "30 days", });

  return { accessToken, refreshToken };
}