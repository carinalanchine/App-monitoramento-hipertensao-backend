import { Request, Response } from "express";
import VideoRepository from "../repositories/video.repository";
import { CreateVideoUseCase } from "../../domain/useCases/create-video.use-case";
import { DeleteVideoUseCase } from "../../domain/useCases/delete-video.use-case";
import { EditVideoUseCase } from "../../domain/useCases/edit-video.use-case";
import { ListVideoUseCase } from "../../domain/useCases/list-video.use-case";
import HttpError from "../../infra/exceptions/httpError";

class VideoController {
  async create(req: Request, res: Response) {
    try {
      const { title, url } = req.body;
      const hospitalId = req.user.hospitalId;

      if (!title) throw new HttpError("Title is required", 400);
      if (!url) throw new HttpError("URL is required", 400);
      if (!hospitalId) throw new HttpError("Hospital ID is missing", 500);

      const repository = new VideoRepository();
      const useCase = new CreateVideoUseCase(repository);

      await useCase.execute({ title, url, hospitalId });

      res.status(201).json({
        status: "success",
        message: "Vídeo cadastrado com sucesso"
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
          message: "Erro ao cadastrar vídeo"
        });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      if (!id) throw new HttpError("Video ID is required", 400);

      const repository = new VideoRepository();
      const useCase = new DeleteVideoUseCase(repository);

      await useCase.execute(id);

      res.status(200).json({
        status: "success",
        message: "Vídeo deletado com sucesso"
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
          message: "Erro ao deletar vídeo"
        });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { title, url } = req.body;
      const { videoId } = req.params;

      if (!title) throw new HttpError("Title is required", 400);
      if (!url) throw new HttpError("URL is required", 400);
      if (!videoId) throw new HttpError("Video ID is required", 400);

      const repository = new VideoRepository();
      const useCase = new EditVideoUseCase(repository);

      await useCase.execute(videoId, { title, url })

      res.status(200).json({
        status: "success",
        message: "Vídeo editado com sucesso"
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
          message: "Erro ao editar vídeo"
        });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const hospitalId = req.user.hospitalId;

      if (!hospitalId) throw new HttpError("Hospital ID missing", 500);

      const repository = new VideoRepository();
      const useCase = new ListVideoUseCase(repository);

      const listVideos = await useCase.execute(hospitalId);

      res.status(200).json({
        status: "success",
        message: "Vídeos recuperados com sucesso",
        total: listVideos.total,
        videos: listVideos.videos
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
          message: "Erro ao listar vídeos"
        });
    }
  }
}

export default new VideoController();
