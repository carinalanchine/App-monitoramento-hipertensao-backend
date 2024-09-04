import { Request, Response, NextFunction } from "express";
import HttpError from "../exceptions/httpError";

export function authorizationHealthAgent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req;

    if (!user)
      throw new HttpError("User is missing", 500);

    if (user.role !== "HEALTH_AGENT" && user.role !== "ADMIN")
      throw new HttpError("Usuário não é autorizado", 403);

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({
        status: "error",
        message: error.message
      });
    }

    else
      res.status(403).json({
        status: "error",
        message: "Usuário inválido"
      });
  }
}