import HttpError from "../../infra/exceptions/httpError";
import { CreateVideoInput, IVideoRepository } from "../interfaces/IVideoRepository";

export class CreateVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(video: CreateVideoInput) {
    const videoCreated = await this.videoRepository.createVideo({ ...video });

    if (!videoCreated)
      throw new HttpError("Vídeo não criado", 500);

    return { id: videoCreated.id };
  }
}