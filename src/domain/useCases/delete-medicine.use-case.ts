import HttpError from "../../infra/exceptions/httpError";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class DeleteMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(id: string) {
    const medicine = await this.medicineRepository.findMedicineById(id);

    if (!medicine)
      throw new HttpError("Remédio não encontrado", 404);

    await this.medicineRepository.deleteMedicine(id);
  }
}
