import { prisma } from "../../infra/db/prisma";
import { Medicine } from "../../domain/entities/Medicine";
//import { MedicineTakenStatus } from "@prisma/client";
import { IMedicineRepository } from "../../domain/interfaces/IMedicineRepository";

type CreateMedicineInput = Omit<Medicine, "id" | "createdAt" | "updatedAt">;
type EditMedicineInput = Omit<Medicine, "id" | "createdAt" | "updatedAt" | "patientId">;

class MedicineRepository implements IMedicineRepository {
  async createMedicine({
    name,
    interval,
    patientId,
    dosage
  }: CreateMedicineInput): Promise<{ id: string } | null> {
    try {
      const medicineCreated = await prisma.medicine.create({
        data: {
          name,
          interval,
          patientId,
          dosage
        }
      });

      return {
        id: medicineCreated.id,
      };
    } catch (error) {
      throw new Error(`Error on create medicine: ${error}`);
    }
  }

  async findMedicineById(id: string): Promise<Medicine | null> {
    try {
      const medicine = await prisma.medicine.findUnique({
        where: {
          id,
        },
      });

      if (!medicine) {
        return null;
      }

      return {
        ...medicine
      };
    } catch (error) {
      throw new Error(`Error on find medicine by id: ${error}`);
    }
  }

  async findMedicineByPatientId(patientId: string): Promise<Medicine[]> {
    try {
      const medicines = await prisma.medicine.findMany({
        where: {
          patientId,
        },
      });

      return medicines.map((medicine) => ({
        ...medicine
      }));
    } catch (error) {
      throw new Error(`Error on find medicine by patient id: ${error}`);
    }
  }

  /*async takeMedicine(medicineId: string, status: MedicineTakenStatus): Promise<{ id: string } | null> {
    try {
      const medicineTaken = await prisma.medicineTaken.create({
        data: {
          medicineId,
          status
        }
      });

      return {
        id: medicineTaken.id,
      };
    } catch (error) {
      throw new Error(`error on take medicine: ${error}`);
    }
  }*/

  async deleteMedicine(id: string) {
    try {
      await prisma.medicine.delete({
        where: {
          id
        }
      });
    } catch (error) {
      throw new Error(`Error on delete medicine: ${error}`);
    }
  }

  async editMedicine(id: string, editMedicineInput: EditMedicineInput): Promise<{ id: string } | null> {
    try {
      const updatedMedicine = await prisma.medicine.update({
        where: { id },
        data: { ...editMedicineInput },
      });

      return {
        id: updatedMedicine.id,
      };
    } catch (error) {
      throw new Error(`Error editing medicine: ${error}`);
    }
  }
}


export default MedicineRepository; 
