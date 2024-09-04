import { Request, Response } from "express";
import PatientRepository from "../repositories/patient.repository";
import { CreatePatientUseCase } from "../../domain/useCases/create-patient.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HttpError from "../../infra/exceptions/httpError";

class PatientController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, name, password, hospitalId } = req.body;

      if (!cpf) throw new HttpError("CPF is required", 400);
      if (!name) throw new HttpError("Name is required", 400);
      if (!password) throw new HttpError("Password is required", 400);
      if (!hospitalId) throw new HttpError("Hospital ID is required", 400);

      const repository = new PatientRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreatePatientUseCase(repository, criptography);

      await useCase.execute({ cpf, hospitalId, name, password });

      res.status(201).json({
        status: "success",
        message: "Paciente cadastrado com sucesso"
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
          message: "Erro ao cadastrar paciente"
        });
    }
  }
}

export default new PatientController();
