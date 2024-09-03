import { Request, Response } from "express";
import PatientRepository from "../repositories/patient.repository";
import { CreatePatientUseCase } from "../../domain/useCases/create-patient.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";

class PatientController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, name, password, hospital_id } = req.body;

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

      const repository = new PatientRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreatePatientUseCase(repository, criptography);

      const createPatient = await useCase.execute({ cpf, hospital_id, name, password });

      if (!createPatient)
        throw new Error("Erro ao criar paciente");

      res.status(201).json({
        status: "success",
        message: "Paciente cadastrado"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Paciente não cadastrado"
      });
    }
  }
}

export default new PatientController();
