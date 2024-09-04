import { Medicine, MedicineTakenStatus } from "../entities/Medicine";

export type CreateMedicineInput = Omit<Medicine, "id">;
export type EditMedicineInput = Omit<Medicine, "id" | "patientId">;

export interface IMedicineRepository {
  createMedicine(medicine: CreateMedicineInput): Promise<{ id: string } | null>;
  findMedicineById(id: string): Promise<Medicine | null>;
  findMedicineByPatientId(patientId: string): Promise<Medicine[]>;
  deleteMedicine(id: string): Promise<void>;
  editMedicine(id: string, medicine: EditMedicineInput): Promise<{ id: string } | null>;
  takeMedicine(medicineId: string, status: MedicineTakenStatus): Promise<{ id: string } | null>;
}