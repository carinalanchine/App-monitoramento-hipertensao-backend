import HttpError from "../../infra/exceptions/httpError";
import { IVideoRepository } from "../interfaces/IVideoRepository";

export class DeleteVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(videoId: string) {
    const video = await this.videoRepository.findVideoById(videoId);

    if (!video)
      throw new HttpError("Video não encontrado", 404);

    await this.videoRepository.deleteVideo(videoId);
  }
}
