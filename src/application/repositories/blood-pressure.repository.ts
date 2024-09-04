import { prisma } from "../../infra/db/prisma";
import { BloodPressure } from "../../domain/entities/BloodPressure";
import HttpError from "../../infra/exceptions/httpError";

class BloodPressureRepository {
  async createBloodPressure({
    patientId,
    systolic,
    diastolic
  }: Omit<BloodPressure, "id">): Promise<{ id: string } | null> {
    try {
      const bloodPressureCreated = await prisma.bloodPressure.create({
        data: {
          patientId,
          systolic,
          diastolic
        }
      });

      if (!bloodPressureCreated)
        return null;

      return {
        id: bloodPressureCreated.id
      }

    } catch (error) {
      throw new HttpError("Error on create blood pressure", 500);
    }
  }
}

export default BloodPressureRepository;