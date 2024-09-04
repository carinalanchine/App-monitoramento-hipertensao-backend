import { BloodPressure } from "../entities/BloodPressure"
import HttpError from "../../infra/exceptions/httpError";
import { IBloodPressureRepository } from "../interfaces/IBloodPressureRepository";

export class CreateBloodPressureUseCase {
  constructor(
    private bloodPressureRepository: IBloodPressureRepository
  ) { }

  async execute(pressure: Omit<BloodPressure, "id">) {
    const bloodPressure = await this.bloodPressureRepository.createBloodPressure(pressure);

    if (!bloodPressure)
      throw new HttpError("Pressão não criada", 500);

    return { id: bloodPressure.id };
  }
}