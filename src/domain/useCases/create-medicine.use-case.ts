import { Medicine } from "../entities/Medicine";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class CreateMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(medicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">) {
    const medicineCreated = await this.medicineRepository.createMedicine({
      ...medicine
    });

    if (!medicineCreated) throw new Error("Medicine not created");

    return { id: medicineCreated.id };
  }
}