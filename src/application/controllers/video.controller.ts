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

      if (!title) throw new HttpError("Título não informado", 400);
      if (!url) throw new HttpError("URL não informada", 400);

      const repository = new VideoRepository();
      const useCase = new CreateVideoUseCase(repository);

      await useCase.execute({ title, url, hospitalId });

      res.status(201).json({
        message: "Cadastro de vídeo bem sucedido"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao cadastrar vídeo"
        });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      if (!id) throw new HttpError("ID do vídeo não informado", 400);

      const repository = new VideoRepository();
      const useCase = new DeleteVideoUseCase(repository);

      await useCase.execute(id);

      res.status(200).json({
        message: "Exclusão de vídeo bem sucedida"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao excluir vídeo"
        });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { title, url } = req.body;
      const { videoId } = req.params;

      if (!title) throw new HttpError("Título não informado", 400);
      if (!url) throw new HttpError("URL não informada", 400);
      if (!videoId) throw new HttpError("ID do vídeo não informado", 400);

      const repository = new VideoRepository();
      const useCase = new EditVideoUseCase(repository);

      await useCase.execute(videoId, { title, url })

      res.status(200).json({
        message: "Edição de vídeo bem sucedida"
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao editar vídeo"
        });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const hospitalId = req.user.hospitalId;

      const repository = new VideoRepository();
      const useCase = new ListVideoUseCase(repository);

      const listVideos = await useCase.execute(hospitalId);

      res.status(200).json({
        message: "Vídeos recuperados com sucesso",
        videos: listVideos.videos
      });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao recuperar vídeos"
        });
    }
  }
}

export default new VideoController();
