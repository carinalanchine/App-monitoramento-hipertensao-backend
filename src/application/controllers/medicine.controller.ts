import { Request, Response } from "express";
import MedicineRepository from "../repositories/medicine.repository";
import { CreateMedicineUseCase } from "../../domain/useCases/create-medicine.use-case";
import { TakeMedicineUseCase } from "../../domain/useCases/take-medicine.use-case";
import { DeleteMedicineUseCase } from "../../domain/useCases/delete-medicine.use-case";
import { ListMedicineUseCase } from "../../domain/useCases/list-medicine.use-case";
import { EditMedicineUseCase } from "../../domain/useCases/edit-medicine.use-case";

class MedicineController {

  async create(req: Request, res: Response) {
    try {
      const { title, patient_id, interval, dosage } = req.body;

      try {
        if (!title) throw new Error("Name missing");
        if (!patient_id) throw new Error("Patient ID missing");
        if (!interval) throw new Error("Interval missing");
        if (!dosage) throw new Error("Dosage missing");
      } catch (error) {
        res.status(400).json({
          status: "error",
          message: "Dados incompletos"
        });
      }

      const repository = new MedicineRepository();
      const useCase = new CreateMedicineUseCase(repository);

      const createMedicine = await useCase.execute({ title, patient_id, interval, dosage });

      if (!createMedicine)
        throw new Error("Medicine not created");

      res.status(201).json({
        status: "success",
        message: "Remédio cadastrado com sucesso"
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      try {
        if (!id) throw new Error("ID missing");
      } catch (error) {
        res.status(400).json({
          status: 400,
          message: "medicineId missing",
        });
      }

      const repository = new MedicineRepository();
      const useCase = new DeleteMedicineUseCase(repository);

      const deleteMedicine = await useCase.execute(id);

      if (!deleteMedicine.success)
        throw new Error("Remédio não deletado");

      res.status(200).json({
        status: "success",
        message: "Remédio excluído com sucesso"
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { title, interval, dosage } = req.body;
      const { id } = req.params;

      try {
        if (!title) throw new Error("Title missing");
        if (!interval) throw new Error("Inteval missing");
        if (!dosage) throw new Error("Dosage missing");
        if (!id) throw new Error("Medicine ID missing");
      } catch (e) {
        console.error(e);
      }

      const repository = new MedicineRepository();
      const useCase = new EditMedicineUseCase(repository);

      const editedMedicine = await useCase.execute(id, { title, interval, dosage });

      if (!editedMedicine)
        throw new Error("Remédio não editado");

      res.status(200).json({
        status: "success",
        messenger: "Remédio editado"
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
      const { medicine_id, status } = req.body;

      try {
        if (!medicine_id) throw new Error("Medicine ID missing");
        if (!status) throw new Error("Status missing");
      } catch (e) {
        console.error(e);
      }

      const repository = new MedicineRepository();
      const useCase = new TakeMedicineUseCase(repository);

      const medicineWasTaken = await useCase.execute({ medicine_id, status });

      if (!medicineWasTaken)
        throw new Error("Erro ao cadastrar remédio tomado");

      res.status(200).json({
        status: "success",
        message: "Status do remédio cadastrado"
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { patientId } = req.params;

      try {
        if (patientId) throw new Error("Patient ID missing");
      } catch (e) {
        console.error(e);
      }

      const repository = new MedicineRepository();
      const useCase = new ListMedicineUseCase(repository);

      const listMedicines = await useCase.execute(patientId);

      if (!listMedicines)
        throw new Error("Lista de remédios não recuperada");

      res.status(200).json({
        status: 'success',
        medicines: listMedicines
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }
}

export default new MedicineController();
