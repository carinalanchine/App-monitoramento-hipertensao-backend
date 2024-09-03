import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class ListMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(patientId: string) {
    const arrayMedicines = await this.medicineRepository.findMedicineByPatientId(patientId);

    if (!arrayMedicines)
      throw new Error("Erro ao recuperar remédios");

    return arrayMedicines.map(medicine => ({
      ...medicine
    }));
  }
}