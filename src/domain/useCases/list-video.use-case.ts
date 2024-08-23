import { IVideoRepository } from "../interfaces/IVideoRepository";

export class ListVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(hospitalId: string) {
    try {
      const videos = await this.videoRepository.findVideoByHospitalId(hospitalId);

      if (!videos.length) {
        throw new Error("No videos found");
      }

      return videos.map(video => ({
        id: video.id,
        title: video.title,
        url: video.url,
        hospitalId: video.hospitalId,
      }));

    } catch (error) {
      throw new Error(`error on list video: ${error}`);
    }

  }
}