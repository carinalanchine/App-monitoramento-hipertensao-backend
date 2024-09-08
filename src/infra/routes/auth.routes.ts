import { Router } from "express";
import authController from "../../application/controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/refresh", authenticateToken, authController.refresh);

export default authRouter;
