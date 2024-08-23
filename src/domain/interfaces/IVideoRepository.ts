import { Video } from "../entities/Video";

export type CreateVideoInput = Omit<Video, "id" | "createdAt" | "updatedAt">;
export type EditVideoInput = Omit<Video, "id" | "hospitalId" | "createdAt" | "updatedAt">;

export interface IVideoRepository {
  createVideo(video: CreateVideoInput): Promise<{ id: string } | null>;
  deleteVideo(videoId: string): Promise<void>;
  findVideoById(videoId: string): Promise<Video | null>;
  editVideo(videoId: string, video: EditVideoInput): Promise<{ id: string } | null>;
  findVideoByHospitalId(hospitalId: string): Promise<Video[]>;
}