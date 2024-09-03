import { Router } from "express";
import patientController from "../../application/controllers/patient.controller";

const patientRouter = Router();

patientRouter.post("/patient", patientController.create);

export default patientRouter;
