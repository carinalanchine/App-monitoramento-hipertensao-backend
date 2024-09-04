import { Request, Response } from "express";
import { CreateHealthAgentUseCase } from "../../domain/useCases/create-healthAgent.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HealthAgentRepository from "../repositories/health-agent.repository";
import HttpError from "../../infra/exceptions/httpError";

class HealthAgentController {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, password, hospitalId } = req.body;

      if (!cpf) throw new HttpError("CPF is required", 400);
      if (!name) throw new HttpError("Name is required", 400);
      if (!password) throw new HttpError("Password is required", 400);
      if (!hospitalId) throw new HttpError("Hospital ID is required", 400);

      const repository = new HealthAgentRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreateHealthAgentUseCase(repository, criptography);

      await useCase.execute({ name, cpf, password, hospitalId });

      res.status(201).json({
        status: "success",
        message: "Agente de saúde cadastrado com sucesso"
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
          message: "Erro ao cadastrar agente de saúde"
        });
    }
  }
}

export default new HealthAgentController();