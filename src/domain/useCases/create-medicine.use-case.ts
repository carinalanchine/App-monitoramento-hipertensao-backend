import HttpError from "../../infra/exceptions/httpError";
import { CreateMedicineInput, IMedicineRepository } from "../interfaces/IMedicineRepository";

export class CreateMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(medicine: CreateMedicineInput) {
    const medicineCreated = await this.medicineRepository.createMedicine({ ...medicine });

    if (!medicineCreated)
      throw new HttpError("Remédio não criado", 500);

    return { id: medicineCreated.id };
  }
}