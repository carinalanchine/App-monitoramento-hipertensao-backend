import { Video } from "../../domain/entities/Video";
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
    } catch (error) {
      throw new Error("Error on create video: " + `${error}`);
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

    } catch (error) {
      throw new Error("Error on find video by ID: " + `${error}`);
    }
  }

  async deleteVideo(id: string) {
    try {
      await prisma.video.delete({
        where: {
          id,
        }
      })

    } catch (error) {
      throw new Error("Error on delete video: " + `${error}`);
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

    } catch (error) {
      throw new Error("Error on edit video: " + `${error}`);
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

    } catch (error) {
      throw new Error("Error on find video by hospital ID: " + `${error}`);
    }
  }
}

export default VideoRepository;