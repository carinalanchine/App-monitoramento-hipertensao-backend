import { prisma } from "../../infra/db/prisma";
import { BloodPressure } from "../../domain/entities/BloodPressure";

class BloodPressureRepository {
  async createBloodPressure({
    patient_id,
    systolic,
    diastolic
  }: Omit<BloodPressure, "id">): Promise<{ id: string } | null> {
    try {
      const bloodPressureCreated = await prisma.bloodPressure.create({
        data: {
          patientId: patient_id,
          systolic,
          diastolic
        }
      });

      if (!bloodPressureCreated)
        return null;

      return {
        id: bloodPressureCreated.patientId
      }

    } catch (error) {
      throw new Error(`Error on create blood pressure: ${error}`);
    }
  }
}

export default BloodPressureRepository;