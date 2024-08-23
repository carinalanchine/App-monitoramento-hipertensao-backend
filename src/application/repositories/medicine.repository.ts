import { prisma } from "../../infra/db/prisma";
import { DosageType, Medicine } from "../../domain/entities/Medicine";
import { MedicineTakenStatus } from "@prisma/client";
import { IMedicineRepository } from "../../domain/interfaces/IMedicineRepository";

type CreateMedicineInput = Omit<Medicine, "id" | "createdAt" | "updatedAt">;
type EditMedicineInput = Omit<Medicine, "id" | "createdAt" | "updatedAt" | "patientId">;

class MedicineRepository implements IMedicineRepository {
  async createMedicine({
    name,
    color,
    initialDate,
    intervalInHour,
    patientId,
    dosage,
    dosageType
  }: CreateMedicineInput): Promise<{ id: string } | null> {
    try {
      const medicineCreated = await prisma.medicine.create({
        data: {
          name,
          color,
          initialDate,
          intervalInHour,
          patientId,
          dosage,
          dosageType
        }
      });

      return {
        id: medicineCreated.id,
      };
    } catch (error) {
      throw new Error(`error on create medicine: ${error}`);
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
        id: medicine.id,
        name: medicine.name,
        color: medicine.color,
        patientId: medicine.patientId,
        initialDate: medicine.initialDate,
        intervalInHour: medicine.intervalInHour,
        dosage: medicine.dosage,
        dosageType: DosageType[medicine.dosageType],
        createdAt: medicine.createdAt,
        updatedAt: medicine.updatedAt,
      };
    } catch (error) {
      throw new Error(`error on find medicine by id: ${error}`);
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
        id: medicine.id,
        name: medicine.name,
        color: medicine.color,
        patientId: medicine.patientId,
        initialDate: medicine.initialDate,
        intervalInHour: medicine.intervalInHour,
        dosage: medicine.dosage,
        dosageType: DosageType[medicine.dosageType],
        createdAt: medicine.createdAt,
        updatedAt: medicine.updatedAt,
      }));
    } catch (error) {
      throw new Error(`error on find medicine by patient id: ${error}`);
    }
  }

  async takeMedicine(medicineId: string, status: MedicineTakenStatus): Promise<{ id: string } | null> {
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
  }

  async deleteMedicine(medicineId: string) {
    try {
      await prisma.medicine.delete({
        where: {
          id: medicineId
        }
      });
    } catch (error) {
      throw new Error(`error on delete medicine: ${error}`);
    }
  }

  async editMedicine(medicineId: string, editMedicineInput: EditMedicineInput): Promise<{ id: string } | null> {
    try {
      const updatedMedicine = await prisma.medicine.update({
        where: { id: medicineId },
        data: { ...editMedicineInput },
      });

      return {
        id: updatedMedicine.id,
      };
    } catch (error) {
      throw new Error(`error editing medicine: ${error}`);
    }
  }
}


export default MedicineRepository; 
