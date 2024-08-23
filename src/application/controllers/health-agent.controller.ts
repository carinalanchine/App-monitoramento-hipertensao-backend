import { Request, Response } from "express";
import { CreateHealthAgentUseCase } from "../../domain/useCases/create-healthAgent.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HealthAgentRepository from "../repositories/health-agent.repository";

class HealthAgentController {
  async register(req: Request, res: Response) {
    try {
      const { name, cpf, password, hospitalID } = req.body;

      const repository = new HealthAgentRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreateHealthAgentUseCase(repository, criptography);

      const response = await useCase.execute({ name, cpf, password, hospitalID });

      res.status(201).json({
        id: response.id,
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new HealthAgentController();