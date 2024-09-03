import { TakeMedicine } from "../entities/Medicine";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

type TakeMedicineInput = Omit<TakeMedicine, "id">;

export class TakeMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository
  ) { }

  async execute({ medicine_id, status }: TakeMedicineInput) {
    const medicine = await this.medicineRepository.findMedicineById(medicine_id);

    if (!medicine)
      throw new Error("Medicine not found");

    const medicineTaken = await this.medicineRepository.takeMedicine(medicine_id, status);

    if (!medicineTaken)
      throw new Error("Medicine status not registered");

    return medicineTaken.id;
  }
}