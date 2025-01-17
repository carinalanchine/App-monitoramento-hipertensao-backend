import { prisma } from "../../infra/db/prisma";
import { Patient } from "../../domain/entities/Patient";

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
      throw new Error("Error on create patient: " + `${error}`);
    }
  }
}

export default PatientRepository;
