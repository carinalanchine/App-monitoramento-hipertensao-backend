import { IMedicineRepository } from "../interfaces/IMedicineRepository";

export class FindMedicineUseCase {
    constructor(
        private medicineRepository: IMedicineRepository,
      ) {}

    async execute (medicineID: string) {
        if (!medicineID) throw new Error("medicine ID is required");

        const medicine = await this.medicineRepository.findMedicineById(medicineID);

        if (!medicine) throw new Error("medicine not found");

        return medicine;
    }
}