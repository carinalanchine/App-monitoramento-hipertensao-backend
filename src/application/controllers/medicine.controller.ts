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

      if (!title) throw new HttpError("Título não informado", 400);
      if (!patientId) throw new HttpError("ID do paciente não informado", 400);
      if (!interval) throw new HttpError("Intervalo não informado", 400);
      if (!dosage) throw new HttpError("Dosagem não informada", 400);

      const repository = new MedicineRepository();
      const useCase = new CreateMedicineUseCase(repository);

      await useCase.execute({ title, patientId, interval, dosage });

      res.status(201).json({
        message: "Cadastro de remédio bem sucedido"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao cadastrar remédio"
        });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) throw new HttpError("ID do remédio não informado", 400);

      const repository = new MedicineRepository();
      const useCase = new DeleteMedicineUseCase(repository);

      await useCase.execute(id);

      res.status(200).json({
        message: "Exclusão de remédio bem sucedida"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao excluir remédio"
        });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { title, interval, dosage } = req.body;
      const { id } = req.params;

      if (!title) throw new HttpError("Título não informado", 400);
      if (!interval) throw new HttpError("Intervalo não informado", 400);
      if (!dosage) throw new HttpError("Dosagem não informada", 400);
      if (!id) throw new HttpError("ID do remédio não informado", 400);

      const repository = new MedicineRepository();
      const useCase = new EditMedicineUseCase(repository);

      await useCase.execute(id, { title, interval, dosage });

      res.status(200).json({
        message: "Edição de remédio bem sucedida"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao editar remédio"
        });
    }
  }

  async take(req: Request, res: Response) {
    try {
      const { medicineId, status } = req.body;

      if (!medicineId) throw new HttpError("ID do remédio não informado", 400);
      if (!status) throw new HttpError("Estado do remédio não informado", 400);

      const repository = new MedicineRepository();
      const useCase = new TakeMedicineUseCase(repository);

      await useCase.execute({ medicineId, status });

      res.status(201).json({
        message: "Cadastro de remédio tomado bem sucedido"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao cadastrar remédio tomado"
        });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { patientId } = req.params;

      if (!patientId) throw new HttpError("ID do paciente não informado", 400);

      const repository = new MedicineRepository();
      const useCase = new ListMedicineUseCase(repository);

      const listMedicines = await useCase.execute(patientId);

      res.status(200).json({
        message: "Remédios recuperados com sucesso",
        medicines: listMedicines.medicines
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao recuperar remédios"
        });
    }
  }
}

export default new MedicineController();
