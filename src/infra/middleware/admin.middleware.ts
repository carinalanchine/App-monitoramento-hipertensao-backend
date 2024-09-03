import { Request, Response, NextFunction } from "express";

export function authorizationAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req;

    if (!user)
      throw new Error("Usuário não encontrado");

    if (user.role !== "ADMIN")
      throw new Error("Usuário não é administrador");

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ status: "error", message: "Usuário inválido" });
  }
}
