import Song from "../models/songModel.js";

export const getAllSongs = async (request, response, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    response.status(200).json(songs);
  } catch (error) {
    console.error("Error while getting all songs", error);
    next(error);
  }
};

export const getFeaturedSongs = async (request, response, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imgUrl: 1,
          songUrl: 1,
          album: 1,
          duration: 1,
        },
      },
    ]);
    response.status(200).json(songs);
  } catch (error) {
    console.error("Error while getting featured songs", error);
    next(error);
  }
};

export const getMadeForYouSongs = async (request, response, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imgUrl: 1,
          songUrl: 1,
          album: 1,
          duration: 1,
        },
      },
    ]);
    response.status(200).json(songs);
  } catch (error) {
    console.error("Error while getting made for you songs", error);
    next(error);
  }
};

export const getTrendingSongs = async (request, response, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imgUrl: 1,
          songUrl: 1,
          album: 1,
          duration: 1,
        },
      },
    ]);
    response.status(200).json(songs);
  } catch (error) {
    console.error("Error while getting trending songs", error);
    next(error);
  }
};
