import { Router } from "express";
import medicineController from "../../application/controllers/medicine.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const medicineRouter = Router();

medicineRouter.post("/medicine", authenticateToken, medicineController.create);
medicineRouter.post("/medicine/take", authenticateToken, medicineController.take);
medicineRouter.delete("/medicine/:id", authenticateToken, medicineController.delete);
medicineRouter.get("/medicine/find", authenticateToken, medicineController.findByID);
medicineRouter.get("/medicine/list", authenticateToken, medicineController.list);
medicineRouter.patch("/medicine/:medicineId", authenticateToken, medicineController.edit);

export default medicineRouter;
