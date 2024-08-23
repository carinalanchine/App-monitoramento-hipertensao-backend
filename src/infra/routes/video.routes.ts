import { Router } from "express";
import videoController from "../../application/controllers/video.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const videoRouter = Router();

videoRouter.post("/video", authenticateToken, videoController.create);
videoRouter.delete("/video/delete", authenticateToken, videoController.delete);
videoRouter.patch("/video/:videoId", authenticateToken, videoController.edit);
videoRouter.get("/video/list", authenticateToken, videoController.list);

export default videoRouter;