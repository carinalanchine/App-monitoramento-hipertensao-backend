import HttpError from "../../infra/exceptions/httpError";
import { IVideoRepository, EditVideoInput } from "../interfaces/IVideoRepository";

export class EditVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(id: string, video: EditVideoInput) {
    const videoExists = await this.videoRepository.findVideoById(id);

    if (!videoExists)
      throw new HttpError("Vídeo não encontrado", 404);

    const videoEdited = await this.videoRepository.editVideo(id, video);

    if (!videoEdited)
      throw new HttpError("Vídeo não editado", 500);

    return { id: videoEdited.id };
  }
}