import { Video } from "../../domain/entities/Video";
import HttpError from "../../infra/exceptions/httpError";
import { CreateVideoInput, IVideoRepository, EditVideoInput } from "../../domain/interfaces/IVideoRepository";
import { prisma } from "../../infra/db/prisma";

class VideoRepository implements IVideoRepository {
  async createVideo({ title, url, hospitalId }: CreateVideoInput): Promise<{ id: string } | null> {
    try {
      const videoCreated = await prisma.video.create({
        data: {
          title,
          url,
          hospitalId
        }
      })

      if (!videoCreated)
        return null;

      return {
        id: videoCreated.id
      }
    } catch (e) {
      throw new HttpError("Error on create video", 500);
    }
  }

  async findVideoById(id: string): Promise<Video | null> {
    try {
      const video = await prisma.video.findUnique({
        where: {
          id,
        }
      })

      if (!video)
        return null;

      return {
        id: video.id,
        title: video.title,
        url: video.url,
        hospitalId: video.hospitalId
      };

    } catch (e) {
      throw new HttpError("Error on find video by ID", 500);
    }
  }

  async deleteVideo(id: string) {
    try {
      await prisma.video.delete({
        where: {
          id,
        }
      })

    } catch (e) {
      throw new HttpError("Error on delete video", 500);
    }
  }

  async editVideo(id: string, video: EditVideoInput): Promise<{ id: string } | null> {
    try {
      const updatedVideo = await prisma.video.update({
        where: { id },
        data: { ...video }
      })

      if (!updatedVideo)
        return null;

      return {
        id: updatedVideo.id,
      };

    } catch (e) {
      throw new HttpError("Error on edit video", 500);
    }
  }

  async findVideoByHospitalId(hospitalId: string): Promise<Video[]> {
    try {
      const videos = await prisma.video.findMany({
        where: {
          hospitalId,
        }
      })

      return videos.map((video) => ({
        id: video.id,
        title: video.title,
        url: video.url,
        hospitalId: video.hospitalId
      }));

    } catch (e) {
      throw new HttpError("Error on find video by hospital ID", 500);
    }
  }
}

export default VideoRepository;