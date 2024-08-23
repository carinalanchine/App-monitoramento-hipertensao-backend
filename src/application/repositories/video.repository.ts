import { Video } from "../../domain/entities/Video";
import { CreateVideoInput, IVideoRepository, EditVideoInput } from "../../domain/interfaces/IVideoRepository";
import { prisma } from "../../infra/db/prisma";

class VideoRepository implements IVideoRepository {
  async createVideo({ title, url, hospitalId }: CreateVideoInput): Promise<{ id: string } | null> {
    try {
      const videoCreated = await prisma.listVideo.create({
        data: {
          title,
          url,
          hospitalId
        }
      })

      return {
        id: videoCreated.id
      }
    } catch (e) {
      throw new Error(`error on create video: ${e}`);
    }
  }

  async findVideoById(id: string): Promise<Video | null> {
    try {
      const video = await prisma.listVideo.findUnique({
        where: {
          id,
        }
      })

      if (!video) {
        return null;
      }

      return { ...video };

    } catch (e) {
      throw new Error(`error on find video by id: ${e}`);
    }
  }

  async deleteVideo(id: string) {
    try {
      await prisma.listVideo.delete({
        where: {
          id,
        }
      })

    } catch (e) {
      throw new Error(`error on delete video: ${e}`);
    }
  }

  async editVideo(id: string, video: EditVideoInput): Promise<{ id: string } | null> {
    try {
      const updatedVideo = await prisma.listVideo.update({
        where: { id },
        data: { ...video }
      })

      return {
        id: updatedVideo.id,
      };

    } catch (e) {
      throw new Error(`error editing video: ${e}`);
    }
  }

  async findVideoByHospitalId(hospitalId: string): Promise<Video[]> {
    try {
      return await prisma.listVideo.findMany({
        where: {
          hospitalId,
        }
      })

    } catch (e) {
      throw new Error(`error on find video by hospital id: ${e}`);
    }
  }

}

export default VideoRepository;