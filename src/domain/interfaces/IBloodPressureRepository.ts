import { BloodPressure } from "../entities/BloodPressure";

export interface IBloodPressureRepository {
  createBloodPressure(pressure: Omit<BloodPressure, "id">): Promise<{ id: string } | null>;
}