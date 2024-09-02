import { Request, Response } from "express";
import PatientRepository from "../repositories/patient.repository";
import { CreatePatientUseCase } from "../../domain/useCases/create-patient.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";

class PatientController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, name, password, hospital_id } = req.body;

      if (!cpf) throw new Error("CPF missing");
      if (!name) throw new Error("Name missing");
      if (!password) throw new Error("Password missing");

      const repository = new PatientRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreatePatientUseCase(repository, criptography);

      const createPatient = await useCase.execute({
        cpf,
        hospital_id,
        name,
        password
      });

      res.status(200).json({ status: "success", message: "Patient created", id: createPatient });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new PatientController();
