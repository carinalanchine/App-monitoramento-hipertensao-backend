import HttpError from "../../infra/exceptions/httpError";
import { EditMedicineInput, IMedicineRepository } from "../interfaces/IMedicineRepository";

export class EditMedicineUseCase {
  constructor(
    private medicineRepository: IMedicineRepository,
  ) { }

  async execute(id: string, medicine: EditMedicineInput) {
    const medicineExists = await this.medicineRepository.findMedicineById(id);

    if (!medicineExists)
      throw new HttpError("Remédio não encontrado", 404);

    const medicineEdited = await this.medicineRepository.editMedicine(id, medicine);

    if (!medicineEdited)
      throw new Error("Remédio não editado");

    return { id: medicineEdited.id };
  }
}