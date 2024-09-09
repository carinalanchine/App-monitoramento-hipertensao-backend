import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class ListMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(patientId: string) {
    const medicines = await this.medicineRepository.findMedicineByPatientId(patientId);

    return { medicines };
  }
}