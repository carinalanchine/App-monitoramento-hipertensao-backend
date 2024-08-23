import { Request, Response } from "express";
import PatientRepository from "../repositories/patient.repository";
import { CreatePatientUseCase } from "../../domain/useCases/create-patient.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";

class PatientController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, name, password, hospital_id } = req.body;
      const repositoryPatient = new PatientRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new CreatePatientUseCase(
        repositoryPatient,
        criptography
      );

      if (!cpf) {
        res.status(400).json({
          status: 400,
          messenger: "cpf missing",
        });
      }
      if (!name) {
        res.status(400).json({
          status: 400,
          messenger: "name missing",
        });
      }
      if (!password) {
        res.status(400).json({
          status: 400,
          messenger: "password missing",
        });
      }

      const patientWasCreated = await useCase.execute({
        cpf,
        hospital_id,
        name,
        password,
      });

      if (!patientWasCreated) {
        res.status(400).json({
          status: 400,
          messenger: "Patient not created",
        });
      }

      res.json({ status: 200, messenger: "Patient created", id: patientWasCreated.id });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }
}

export default new PatientController();
