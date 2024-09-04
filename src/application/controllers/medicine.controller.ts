import { Request, Response } from "express";
import MedicineRepository from "../repositories/medicine.repository";
import { CreateMedicineUseCase } from "../../domain/useCases/create-medicine.use-case";
import { TakeMedicineUseCase } from "../../domain/useCases/take-medicine.use-case";
import { DeleteMedicineUseCase } from "../../domain/useCases/delete-medicine.use-case";
import { ListMedicineUseCase } from "../../domain/useCases/list-medicine.use-case";
import { EditMedicineUseCase } from "../../domain/useCases/edit-medicine.use-case";
import HttpError from "../../infra/exceptions/httpError";

class MedicineController {

  async create(req: Request, res: Response) {
    try {
      const { title, patientId, interval, dosage } = req.body;

      if (!title) throw new HttpError("Title is required", 400);
      if (!patientId) throw new HttpError("Patient ID is required", 400);
      if (!interval) throw new HttpError("Interval is required", 400);
      if (!dosage) throw new HttpError("Dosage is required", 400);

      const repository = new MedicineRepository();
      const useCase = new CreateMedicineUseCase(repository);

      await useCase.execute({ title, patientId, interval, dosage });

      res.status(201).json({
        status: "success",
        message: "Remédio cadastrado com sucesso"
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message
        });
      }

      else
        res.status(500).json({
          status: "error",
          message: "Erro ao cadastrar remédio"
        });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) throw new HttpError("Medicine ID is required", 400);

      const repository = new MedicineRepository();
      const useCase = new DeleteMedicineUseCase(repository);

      await useCase.execute(id);

      res.status(200).json({
        status: "success",
        message: "Remédio deletado com sucesso"
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message
        });
      }

      else
        res.status(500).json({
          status: "error",
          message: "Erro ao deletar remédio"
        });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { title, interval, dosage } = req.body;
      const { id } = req.params;

      if (!title) throw new HttpError("Title is required", 400);
      if (!interval) throw new HttpError("Interval is required", 400);
      if (!dosage) throw new HttpError("Dosage is required", 400);
      if (!id) throw new HttpError("Medicine ID is required", 400);

      const repository = new MedicineRepository();
      const useCase = new EditMedicineUseCase(repository);

      await useCase.execute(id, { title, interval, dosage });

      res.status(200).json({
        status: "success",
        message: "Remédio editado com sucesso"
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message
        });
      }

      else
        res.status(500).json({
          status: "error",
          message: "Erro ao editar remédio"
        });
    }
  }

  async take(req: Request, res: Response) {
    try {
      const { medicineId, status } = req.body;

      if (!medicineId) throw new HttpError("Medicine ID is required", 400);
      if (!status) throw new HttpError("Status is required", 400);

      const repository = new MedicineRepository();
      const useCase = new TakeMedicineUseCase(repository);

      await useCase.execute({ medicineId, status });

      res.status(200).json({
        status: "success",
        message: "Remédio tomado cadastrado com sucesso"
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message
        });
      }

      else
        res.status(500).json({
          status: "error",
          message: "Erro ao cadastrar remédio tomado"
        });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { patientId } = req.params;

      if (!patientId) throw new HttpError("Patient ID is required", 400);

      const repository = new MedicineRepository();
      const useCase = new ListMedicineUseCase(repository);

      const listMedicines = await useCase.execute(patientId);

      res.status(200).json({
        status: "success",
        message: "Remédios recuperados com sucesso",
        total: listMedicines.total,
        medicines: listMedicines.medicines
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message
        });
      }

      else
        res.status(500).json({
          status: "error",
          message: "Erro ao listar remédios"
        });
    }
  }
}

export default new MedicineController();
