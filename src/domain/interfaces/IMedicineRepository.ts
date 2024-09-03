import { Medicine, MedicineTakenStatus } from "../entities/Medicine";

type CreateMedicineInput = Omit<Medicine, "id">;
type EditMedicineInput = Omit<Medicine, "id" | "patient_id">;

export interface IMedicineRepository {
  createMedicine(medicine: CreateMedicineInput): Promise<{ id: string } | null>;
  findMedicineById(id: string): Promise<Medicine | null>;
  findMedicineByPatientId(patientId: string): Promise<Medicine[]>;
  deleteMedicine(id: string): Promise<void>;
  editMedicine(id: string, medicine: EditMedicineInput): Promise<{ id: string } | null>;
  takeMedicine(medicine_id: string, status: MedicineTakenStatus): Promise<{ id: string } | null>;
}