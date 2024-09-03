import { Medicine } from "../entities/Medicine";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class EditMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(id: string, medicine: Omit<Medicine, "id" | "patient_id">) {
    const medicineEdited = await this.medicineRepository.editMedicine(id, medicine);

    if (!medicineEdited)
      throw new Error("Medicine not edited");

    return medicineEdited.id;
  }
}