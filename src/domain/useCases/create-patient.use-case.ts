import { Patient } from "../entities/Patient";
import { RolesEnum } from "../entities/Role";
import HttpError from "../../infra/exceptions/httpError";
import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IPatientRepository } from "../interfaces/IPatientRepository";

export class CreatePatientUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private criptography: ICriptography
  ) { }

  async execute(patient: Omit<Omit<Patient, "id">, "role">) {
    const encryptedPassword = this.criptography.encrypt(patient.password);

    const patientCreated = await this.patientRepository.createPatient({
      ...patient,
      password: encryptedPassword,
      role: RolesEnum.PATIENT
    });

    if (!patientCreated)
      throw new HttpError("Paciente não criado", 500);

    return { id: patientCreated.id };
  }
}
