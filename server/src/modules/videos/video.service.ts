import { Video, VideoModel } from "./video.model";

export const createVideo = async ({ owner }: { owner: string }) => {
  return VideoModel.create({ owner });
};

export const findVideo = async (videoId: Video["videoId"]) => {
  return VideoModel.findOne({ videoId });
};

export const findVideos = async () => {
  return VideoModel.find({
    published: true,
  }).lean();
};
