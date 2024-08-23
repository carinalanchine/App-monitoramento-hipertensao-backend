import { Router } from "express";
import BloodPressureController from "../../application/controllers/blood-pressure.controller";
import { authenticateToken } from "../middleware/auth.middleware";


const bloodPressureRouter = Router();

bloodPressureRouter.post('/pressure', authenticateToken, BloodPressureController.create);

export default bloodPressureRouter;