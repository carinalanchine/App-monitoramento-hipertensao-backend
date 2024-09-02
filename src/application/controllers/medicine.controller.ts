import { Request, Response } from "express";
import MedicineRepository from "../repositories/medicine.repository";
//import { DosageType } from "../../domain/entities/Medicine";
import { CreateMedicineUseCase } from "../../domain/useCases/create-medicine.use-case";
import { TakeMedicineUseCase } from "../../domain/useCases/take-medicine.use-case";
import { DeleteMedicineUseCase } from "../../domain/useCases/delete-medicine.use-case";
import { ListMedicineUseCase } from "../../domain/useCases/list-medicine.use-case";
import { FindMedicineUseCase } from "../../domain/useCases/find-medicine.use-case";
import { EditMedicineUseCase } from "../../domain/useCases/edit-medicine.use-case";

class MedicineController {
  async create(req: Request, res: Response) {
    try {
      const { name, patientId, interval, dosage } = req.body;

      if (!name) throw new Error("Name missing");
      if (!patientId) throw new Error("Patient ID missing");
      if (!interval) throw new Error("Interval missing");
      if (!dosage) throw new Error("Dosage missing");

      const repository = new MedicineRepository();
      const useCase = new CreateMedicineUseCase(repository);

      const createMedicine = await useCase.execute({
        name,
        patientId,
        interval,
        dosage,
      });

      if (!createMedicine) throw new Error("Medicine not created");

      res.status(200).json({
        status: "success",
        message: "Medicine created",
        id: createMedicine.id
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async take(req: Request, res: Response) {
    try {
      const { medicineId, status } = req.body;
      const repositoryMedicine = new MedicineRepository();
      const useCase = new TakeMedicineUseCase(repositoryMedicine);

      if (!medicineId) {
        res.status(400).json({
          status: 400,
          messenger: "medicineId missing",
        });
        return;
      }

      if (!status) {
        res.status(400).json({
          status: 400,
          messenger: "status missing",
        });
        return;
      }

      const medicineWasTaken = await useCase.execute({
        medicineId,
        status,
      });

      if (!medicineWasTaken) {
        res.status(400).json({
          status: 400,
          messenger: "Medicine not taken",
        });
        return;
      }

      res.json({ status: 200, messenger: "Medicine taken" });
      return;
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
      return;
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const repositoryMedicine = new MedicineRepository();
      const useCase = new DeleteMedicineUseCase(repositoryMedicine);

      if (!id) {
        res.status(400).json({
          status: 400,
          messenger: "medicineId missing",
        });
        return;
      }

      await useCase.execute(id);

      res.json({ status: 200, messenger: "Medicine deleted" });
      return;
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
      return;
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { patientId } = req.params;

      const repositoryMedicine = new MedicineRepository();
      const useCase = new ListMedicineUseCase(repositoryMedicine);

      const listMedicine = await useCase.execute(patientId);

      res.status(200).json({ status: 'success', medicines: listMedicine });
      return;

    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
      return;
    }
  }

  async findByID(req: Request, res: Response) {
    try {
      const { medicineId } = req.body;

      const repository = new MedicineRepository();
      const useCase = new FindMedicineUseCase(repository);

      const response = await useCase.execute(medicineId);

      res.status(200).json({
        id: response.id,
        name: response.name,
        patientId: response.patientId,
        interval: response.interval,
        dosage: response.dosage
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { name, interval, dosage } = req.body;
      const { medicineId } = req.params;
      const repositoryMedicine = new MedicineRepository();
      const editUseCase = new EditMedicineUseCase(repositoryMedicine);

      await editUseCase.execute(medicineId, { name, interval, dosage })

      res.json({ status: 200, messenger: "Medicine edited" });
      return;
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
      return;
    }
  }
}

export default new MedicineController();
