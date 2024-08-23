import { IVideoRepository } from "../interfaces/IVideoRepository";

export class DeleteVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(videoId: string) {
    const video = await this.videoRepository.findVideoById(videoId);

    if (!video) {
      throw new Error("Video not found");
    }

    await this.videoRepository.deleteVideo(videoId);

    return { success: true };
  }
}
