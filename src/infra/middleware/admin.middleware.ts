import { Request, Response, NextFunction } from "express";
import HttpError from "../exceptions/httpError";

export function authorizationAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req;

    if (user.role !== "ADMIN")
      throw new HttpError("Ação não autorizada", 403);

    next();
  } catch (error) {
    if (error instanceof HttpError)
      res.status(error.statusCode).json({
        message: error.message
      });
  }
}
