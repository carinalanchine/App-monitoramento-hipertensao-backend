import { Router } from "express";
import medicineController from "../../application/controllers/medicine.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const medicineRouter = Router();

medicineRouter.post("/medicine", authenticateToken, medicineController.create);
medicineRouter.delete("/medicine/:id", authenticateToken, medicineController.delete);
medicineRouter.get("/medicine/find", authenticateToken, medicineController.findByID);
medicineRouter.get("/medicine/list/:patientId", authenticateToken, medicineController.list);
medicineRouter.patch("/medicine/:medicineId", authenticateToken, medicineController.edit);

//medicineRouter.post("/medicine/take", authenticateToken, medicineController.take);

export default medicineRouter;
