import { Request, Response } from "express";
import VideoRepository from "../repositories/video.repository";
import { CreateVideoUseCase } from "../../domain/useCases/create-video.use-case";
import { DeleteVideoUseCase } from "../../domain/useCases/delete-video.use-case";
import { EditVideoUseCase } from "../../domain/useCases/edit-video.use-case";
import { ListVideoUseCase } from "../../domain/useCases/list-video.use-case";

class VideoController {
  async create(req: Request, res: Response) {
    try {
      const { title, url } = req.body;
      const hospitalId = req.user.hospital_id;

      const repository = new VideoRepository();
      const useCase = new CreateVideoUseCase(repository);

      const createdVideo = await useCase.execute({ title, url, hospitalId });

      if (!createdVideo) {
        res.status(400).json({
          status: 400,
          messenger: "Video not created",
        });
        return;
      }

      res.json({ status: 200, messenger: "Video created", id: createdVideo.id });
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
      const { id } = req.body;
      const repository = new VideoRepository();
      const useCase = new DeleteVideoUseCase(repository);

      if (!id) {
        res.status(400).json({
          status: 400,
          messenger: "videoId missing",
        });
        return;
      }

      await useCase.execute(id);

      res.json({ status: 200, messenger: "Video deleted" });

    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({
        status: 400,
        message: error.message,
      });
      return;
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { title, url } = req.body;
      const { videoId } = req.params;
      const repository = new VideoRepository();
      const useCase = new EditVideoUseCase(repository);

      await useCase.execute(videoId, { title, url })

      res.json({ status: 200, messenger: "Video edited" });

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
      const hospitalId = "17a557d6-697a-450b-b28c-bfdeca6cb23a";
      const repository = new VideoRepository();
      const useCase = new ListVideoUseCase(repository);

      const listVideo = await useCase.execute(hospitalId);

      res.status(200).json({ status: "success", videos: listVideo });

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

export default new VideoController();
