import { Medicine } from "../entities/Medicine";
import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IMedicineRepository, EditMedicineInput } from "../interfaces/IMedicineRepository";

export class EditMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(
        medicineId: string,
        medicine: EditMedicineInput,
    ) {
    const medicineEditedId = await this.medicineRepository.editMedicine(
        medicineId,
        medicine
    );

    if (!medicineEditedId) throw new Error("Medicine not edited");

    return { id: medicineEditedId.id };
  }
}