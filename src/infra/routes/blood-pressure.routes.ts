import { Router } from "express";
import bloodPressureController from "../../application/controllers/blood-pressure.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const bloodPressureRouter = Router();

bloodPressureRouter.post('/pressure', authenticateToken, bloodPressureController.create);

export default bloodPressureRouter;