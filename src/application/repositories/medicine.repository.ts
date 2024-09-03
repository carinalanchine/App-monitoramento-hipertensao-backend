import { prisma } from "../../infra/db/prisma";
import { Medicine } from "../../domain/entities/Medicine";
import { MedicineTakenStatus } from "@prisma/client";
import { IMedicineRepository } from "../../domain/interfaces/IMedicineRepository";

type EditMedicineInput = Omit<Medicine, "id" | "createdAt" | "updatedAt" | "patientId">;

class MedicineRepository implements IMedicineRepository {
  async createMedicine({
    title,
    interval,
    patient_id,
    dosage
  }: Omit<Medicine, "id">): Promise<{ id: string } | null> {
    try {
      const medicineCreated = await prisma.medicine.create({
        data: {
          title,
          interval,
          patientId: patient_id,
          dosage
        }
      });

      if (!medicineCreated)
        return null;

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

      if (!medicine)
        return null;

      return {
        ...medicine,
        patient_id: medicine.patientId
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
        ...medicine,
        patient_id: patientId
      }));
    } catch (error) {
      throw new Error(`Error on find medicine by patient id: ${error}`);
    }
  }

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

  async editMedicine(id: string, medicine: EditMedicineInput): Promise<{ id: string } | null> {
    try {
      const updatedMedicine = await prisma.medicine.update({
        where: { id },
        data: { ...medicine }
      });

      if (!updatedMedicine)
        return null;

      return {
        id: updatedMedicine.id,
      };
    } catch (error) {
      throw new Error(`Error editing medicine: ${error}`);
    }
  }

  async takeMedicine(medicine_id: string, status: MedicineTakenStatus): Promise<{ id: string } | null> {
    try {
      const medicineTaken = await prisma.medicineTaken.create({
        data: {
          medicineId: medicine_id,
          status
        }
      });

      if (!medicineTaken)
        return null;

      return {
        id: medicineTaken.id,
      };
    } catch (error) {
      throw new Error(`Error on take medicine: ${error}`);
    }
  }
}

export default MedicineRepository; 
