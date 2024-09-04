import { Request, Response } from "express";
import BloodPressureRepository from "../repositories/blood-pressure.repository";
import { CreateBloodPressureUseCase } from "../../domain/useCases/blood-pressure.use-case";
import HttpError from "../../infra/exceptions/httpError";

class BloodPressureController {
  async create(req: Request, res: Response) {
    try {
      const { patientId, systolic, diastolic } = req.body;

      if (!patientId) throw new HttpError("Patient ID is required", 400);
      if (!systolic) throw new HttpError("Systolic measurement is required", 400);
      if (!diastolic) throw new HttpError("Diastolic measurement is required", 400);

      const repository = new BloodPressureRepository();
      const useCase = new CreateBloodPressureUseCase(repository);

      await useCase.execute({ patientId, systolic, diastolic });

      res.status(201).json({
        status: "success",
        message: "Pressão cadastrada com sucesso"
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message
        });
      }

      else
        res.status(500).json({
          status: "error",
          message: "Erro ao cadastrar pressão"
        });
    }
  }
}

export default new BloodPressureController();
