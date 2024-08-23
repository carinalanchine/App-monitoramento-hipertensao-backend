import { Request, Response } from "express";
import BloodPressureRepository from "../repositories/blood-pressure.repository";
import { CreateBloodPressureUseCase } from "../../domain/useCases/blood-pressure.use-case";

class BloodPressureController {
  async create(req: Request, res: Response) {
    try {
      const { patientId, systolic, diastolic } = req.body;
      const repositoryBloodPressure = new BloodPressureRepository();
      const useCase = new CreateBloodPressureUseCase(repositoryBloodPressure);

      if (!patientId) {
        res.status(400).json({
          status: 400,
          messenger: "patient id missing",
        });
        return;
      }
      if (!systolic) {
        res.status(400).json({
          status: 400,
          messenger: "systolic missing",
        });
        return;
      }
      if (!diastolic) {
        res.status(400).json({
          status: 400,
          messenger: "diastolic missing",
        });
        return;
      }

      const response = await useCase.execute({ patientId, systolic, diastolic });

      res.status(201).json({
        id: response.id,
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }
}

export default new BloodPressureController();