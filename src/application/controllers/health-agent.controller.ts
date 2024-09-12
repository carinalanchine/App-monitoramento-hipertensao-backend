import { Request, Response } from "express";
import { CreateHealthAgentUseCase } from "../../domain/useCases/create-healthAgent.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HealthAgentRepository from "../repositories/health-agent.repository";
import HttpError from "../../infra/exceptions/httpError";

class HealthAgentController {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, password, hospitalId } = req.body;

      if (!cpf) throw new HttpError("CPF não informado", 400);
      if (!name) throw new HttpError("Nome não informado", 400);
      if (!password) throw new HttpError("Senha não informada", 400);
      if (!hospitalId) throw new HttpError("ID do hospital não informado", 400);

      const repository = new HealthAgentRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreateHealthAgentUseCase(repository, criptography);

      await useCase.execute({ name, cpf, password, hospitalId });

      res.status(201).json({
        message: "Cadastro de agente de saúde bem sucedido"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao cadastrar agente de saúde"
        });
    }
  }
}

export default new HealthAgentController();