import { IVideoRepository, EditVideoInput } from "../interfaces/IVideoRepository";

export class EditVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(videoId: string, video: EditVideoInput) {
    const videoExists = await this.videoRepository.findVideoById(videoId);

    if (!videoExists) {
      throw new Error("Video not found");
    }

    const videoEdited = await this.videoRepository.editVideo(videoId, video);

    if (!videoEdited) throw new Error("Video not edited");

    return { id: videoEdited.id };
  }
}