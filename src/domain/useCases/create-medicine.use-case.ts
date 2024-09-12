import { CreateMedicineInput, IMedicineRepository } from "../interfaces/IMedicineRepository";

export class CreateMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(medicine: CreateMedicineInput) {
    const medicineCreated = await this.medicineRepository.createMedicine({ ...medicine });

    if (!medicineCreated)
      throw new Error("Remédio não criado");

    return { id: medicineCreated.id };
  }
}