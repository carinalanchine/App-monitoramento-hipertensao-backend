import { Router } from "express";
import authController from "../../application/controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);

export default authRouter;
