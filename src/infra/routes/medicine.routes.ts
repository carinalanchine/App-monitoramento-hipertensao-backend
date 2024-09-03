import { Router } from "express";
import medicineController from "../../application/controllers/medicine.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const medicineRouter = Router();

medicineRouter.post("/medicine", authenticateToken, medicineController.create);
medicineRouter.delete("/medicine/:id", authenticateToken, medicineController.delete);
medicineRouter.patch("/medicine/:id", authenticateToken, medicineController.edit);
medicineRouter.post("/medicine/take", authenticateToken, medicineController.take);
medicineRouter.get("/medicine/list/:patientId", authenticateToken, medicineController.list);

export default medicineRouter;
