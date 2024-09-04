import { prisma } from "../../infra/db/prisma";
import { Patient } from "../../domain/entities/Patient";
import HttpError from "../../infra/exceptions/httpError";

class PatientRepository {
  async createPatient({
    cpf,
    hospitalId,
    name,
    password,
    role
  }: Omit<Patient, "id">): Promise<{ id: string } | null> {
    try {
      const userCreated = await prisma.user.create({
        data: {
          cpf,
          name,
          password,
          role,
          hospitalId
        }
      });

      if (!userCreated)
        return null;

      return {
        id: userCreated.id,
      };
    } catch (error) {
      throw new HttpError("Error on create patient", 500);
    }
  }
}

export default PatientRepository;
