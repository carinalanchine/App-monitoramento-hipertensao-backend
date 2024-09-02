import { Medicine } from "../entities/Medicine";
import { IMedicineRepository } from "../interfaces/IMedicineRepository";


export class ListMedicineUseCase {
    private medicineRepository: IMedicineRepository;

    constructor(medicineRepository: IMedicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    async execute(patientId: string) {
        try {
            const arrayMedicines = await this.medicineRepository.findMedicineByPatientId(patientId);

            return arrayMedicines.map(medicine => ({
                id: medicine.id,
                title: medicine.name,
                interval: medicine.interval,
                dosage: medicine.dosage
            }));

        } catch (error) {
            throw new Error(`error on list medicine: ${error}`);
        }

    }
}