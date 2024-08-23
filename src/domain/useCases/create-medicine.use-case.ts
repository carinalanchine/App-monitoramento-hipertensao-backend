import { Medicine } from "../entities/Medicine";
import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class CreateMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(medicine: Omit<Medicine, "id"|"createdAt"|"updatedAt">) {
    const medicineCreated = await this.medicineRepository.createMedicine({
      ...medicine
    });

    if (!medicineCreated) throw new Error("Medicine not registered");

    return { id: medicineCreated.id };
  }
}