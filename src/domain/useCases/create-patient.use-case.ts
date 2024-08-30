import { Patient } from "../entities/Patient";
import { RolesEnum } from "../entities/Role";
import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IPatientRepository } from "../interfaces/IPatientRepository";

export class CreatePatientUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private criptography: ICriptography
  ) { }

  async execute(patient: Omit<Omit<Patient, "id">, "role_tag">) {
    const patientCreated = await this.patientRepository.createPatient({
      ...patient,
      password: this.criptography.encrypt(patient.password),
      role_tag: RolesEnum.PATIENT,
    });

    if (!patientCreated) throw new Error("Patient not created");

    return patientCreated.id;
  }
}
