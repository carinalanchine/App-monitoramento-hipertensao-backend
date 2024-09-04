import { TakeMedicine } from "../entities/Medicine";
import HttpError from "../../infra/exceptions/httpError";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

type TakeMedicineInput = Omit<TakeMedicine, "id">;

export class TakeMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository
  ) { }

  async execute({ medicineId, status }: TakeMedicineInput) {
    const medicine = await this.medicineRepository.findMedicineById(medicineId);

    if (!medicine)
      throw new HttpError("Remédio não encontrado", 404);

    const medicineTaken = await this.medicineRepository.takeMedicine(medicineId, status);

    if (!medicineTaken)
      throw new HttpError("Remédio tomado não criado", 500);

    return { id: medicineTaken.id };
  }
}