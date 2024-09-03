import { Request, Response } from "express";
import { CreateHealthAgentUseCase } from "../../domain/useCases/create-healthAgent.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HealthAgentRepository from "../repositories/health-agent.repository";

class HealthAgentController {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, password, hospital_id } = req.body;

      try {
        if (!cpf) throw new Error("CPF missing");
        if (!name) throw new Error("Name missing");
        if (!password) throw new Error("Password missing");
        if (!hospital_id) throw new Error("Hospital ID missing");
      } catch (error) {
        console.error(error);
        res.status(400).json({
          status: "error",
          message: "Dados incompletos"
        });
      }

      const repository = new HealthAgentRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreateHealthAgentUseCase(repository, criptography);

      const createAgent = await useCase.execute({ name, cpf, password, hospital_id });

      if (!createAgent)
        throw new Error("Erro ao criar agente de saúde");

      res.status(201).json({
        status: "success",
        message: "Agente de saúde cadastrado"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Agente de saúde não cadastrado"
      });
    }
  }
}

export default new HealthAgentController();