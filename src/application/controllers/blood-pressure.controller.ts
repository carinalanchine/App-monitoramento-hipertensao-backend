import { Request, Response } from "express";
import BloodPressureRepository from "../repositories/blood-pressure.repository";
import { CreateBloodPressureUseCase } from "../../domain/useCases/blood-pressure.use-case";
import HttpError from "../../infra/exceptions/httpError";

class BloodPressureController {
  async create(req: Request, res: Response) {
    try {
      const { patientId, systolic, diastolic } = req.body;

      if (!patientId) throw new HttpError("ID do paciente não informado", 400);
      if (!systolic) throw new HttpError("Pressão sistólica não informada", 400);
      if (!diastolic) throw new HttpError("Pressão diastólica não informada", 400);

      const repository = new BloodPressureRepository();
      const useCase = new CreateBloodPressureUseCase(repository);

      await useCase.execute({ patientId, systolic, diastolic });

      res.status(201).json({
        message: "Cadastro de pressão bem sucedido"
      });
    } catch (error) {
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao cadastrar pressão"
        });
    }
  }
}

export default new BloodPressureController();
