import { TakeMedicine } from "../entities/Medicine";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";

type TakeMedicineInput = Omit<TakeMedicine, "id">;

export class TakeMedicineUseCase {
    private medicineRepository: IMedicineRepository;

    constructor(medicineRepository: IMedicineRepository) {
        this.medicineRepository = medicineRepository;
    }
    async execute({ medicineId, status }: TakeMedicineInput) {
        try {
            const medicine = await this.medicineRepository.findMedicineById(medicineId);
            if (!medicine) {
                throw new Error("Medicine not found");
            }
            const medicineTaken = await this.medicineRepository.takeMedicine(medicineId, status);
            if (!medicineTaken) {
                throw new Error("Medicine not taken");
            }
            return true;
        }
        catch (error) {
            throw new Error(`error on take medicine: ${error}`);
        }
    }
}