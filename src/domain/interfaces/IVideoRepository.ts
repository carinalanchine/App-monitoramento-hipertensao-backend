import { Video } from "../entities/Video";

export type CreateVideoInput = Omit<Video, "id">;
export type EditVideoInput = Omit<Video, "id" | "hospitalId">;

export interface IVideoRepository {
  createVideo(video: CreateVideoInput): Promise<{ id: string } | null>;
  deleteVideo(id: string): Promise<void>;
  findVideoById(id: string): Promise<Video | null>;
  editVideo(id: string, video: EditVideoInput): Promise<{ id: string } | null>;
  findVideoByHospitalId(hospitalId: string): Promise<Video[]>;
}