import { BloodPressure } from "../entities/BloodPressure"
import { IBloodPressureRepository } from "../interfaces/IBloodPressureRepository";

export class CreateBloodPressureUseCase {
  constructor(
    private bloodPressureRepository: IBloodPressureRepository
  ) { }

  async execute(pressure: Omit<BloodPressure, "id">) {
    const bloodPressure = await this.bloodPressureRepository.createBloodPressure(pressure);

    if (!bloodPressure)
      throw new Error("Pressão não criada");

    return { id: bloodPressure.id };
  }
}