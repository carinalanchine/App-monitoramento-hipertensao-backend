import { Request, Response, Router } from "express";
import healthAgentController from "../../application/controllers/health-agent.controller";
import { authorizationAdmin } from "../middleware/admin.middleware";
import { authenticateToken } from "../middleware/auth.middleware";

const healthAgentRouter = Router();

healthAgentRouter.post("/agent", authenticateToken, authorizationAdmin, healthAgentController.create);

export default healthAgentRouter;
