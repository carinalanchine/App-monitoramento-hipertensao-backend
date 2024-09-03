import { Router } from "express";
import videoController from "../../application/controllers/video.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { authorizationHealthAgent } from "../middleware/healthAgent.middleware";

const videoRouter = Router();

videoRouter.post("/video", authenticateToken, authorizationHealthAgent, videoController.create);
videoRouter.delete("/video/:id", authenticateToken, authorizationHealthAgent, videoController.delete);
videoRouter.patch("/video/:id", authenticateToken, authorizationHealthAgent, videoController.edit);
videoRouter.get("/video/list", authenticateToken, videoController.list);

export default videoRouter;