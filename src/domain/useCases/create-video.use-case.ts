import { CreateVideoInput, IVideoRepository } from "../interfaces/IVideoRepository";

export class CreateVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(video: CreateVideoInput) {
    const videoCreated = await this.videoRepository.createVideo({ ...video });

    if (!videoCreated)
      throw new Error("Vídeo não criado");

    return { id: videoCreated.id };
  }
}