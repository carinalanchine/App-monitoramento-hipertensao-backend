import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class DeleteMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(id: string) {
    const medicine = await this.medicineRepository.findMedicineById(id);

    if (!medicine) {
      throw new Error("Medicine not found");
    }

    await this.medicineRepository.deleteMedicine(id);

    return { success: true };
  }
}
