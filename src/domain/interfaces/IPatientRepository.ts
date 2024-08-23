import { Patient } from "../entities/Patient";

export interface IPatientRepository {
  createPatient(patient: Omit<Patient, "id">): Promise<{ id: string } | null>;
}
