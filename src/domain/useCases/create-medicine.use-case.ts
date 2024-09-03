import { Medicine } from "../entities/Medicine";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class CreateMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(medicine: Omit<Medicine, "id">) {
    const medicineCreated = await this.medicineRepository.createMedicine({ ...medicine });

    if (!medicineCreated)
      throw new Error("Medicine not created");

    return medicineCreated.id;
  }
}