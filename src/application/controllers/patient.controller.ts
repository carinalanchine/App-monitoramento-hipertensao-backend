import { Request, Response } from "express";
import PatientRepository from "../repositories/patient.repository";
import { CreatePatientUseCase } from "../../domain/useCases/create-patient.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HttpError from "../../infra/exceptions/httpError";

class PatientController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, name, password, hospitalId } = req.body;

      if (!cpf) throw new HttpError("CPF não informado", 400);
      if (!name) throw new HttpError("Nome não informado", 400);
      if (!password) throw new HttpError("Senha não informada", 400);
      if (!hospitalId) throw new HttpError("ID do hospital não informado", 400);

      const repository = new PatientRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreatePatientUseCase(repository, criptography);

      await useCase.execute({ cpf, hospitalId, name, password });

      res.status(201).json({
        message: "Cadastro de paciente bem sucedido"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao cadastrar paciente"
        });
    }
  }
}

export default new PatientController();
