import { Request, Response } from "express";
import BloodPressureRepository from "../repositories/blood-pressure.repository";
import { CreateBloodPressureUseCase } from "../../domain/useCases/blood-pressure.use-case";

class BloodPressureController {
  async create(req: Request, res: Response) {
    try {
      const { patient_id, systolic, diastolic } = req.body;

      try {
        if (!patient_id) throw new Error("Patient ID is required");
        if (!systolic) throw new Error("Systolic measurement is required");
        if (!diastolic) throw new Error("Diastolic measurement is required");
      } catch (error) {
        console.error(error);
        res.status(400).json({
          status: "error",
          message: "Dados incompletos"
        });
      }

      const repository = new BloodPressureRepository();
      const useCase = new CreateBloodPressureUseCase(repository);

      const createPressure = await useCase.execute({ patient_id, systolic, diastolic });

      if (!createPressure)
        throw new Error("Erro ao registrar pressão");

      res.status(201).json({
        status: "success",
        message: "Pressão cadastrada com sucesso"
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new BloodPressureController();
