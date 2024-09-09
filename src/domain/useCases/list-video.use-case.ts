import { IVideoRepository } from "../interfaces/IVideoRepository";

export class ListVideoUseCase {
  constructor(
    private videoRepository: IVideoRepository,
  ) { }

  async execute(hospital_id: string) {
    const videos = await this.videoRepository.findVideoByHospitalId(hospital_id);

    return { videos };
  }
}