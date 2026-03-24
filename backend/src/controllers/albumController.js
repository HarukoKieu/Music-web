import Album from "../models/albumModel.js";

export const getAllAlbums = async (request, response, next) => {
  try {
    const albums = await Album.find();
    response.status(200).json(albums);
  } catch (error) {
    console.error("Error while getting all albums", error);
    next(error);
  }
};

export const getAlbumById = async (request, response, next) => {
  try {
    const { albumId } = request.params;
    const album = await Album.findById(albumId).populate("songs");
    if (!album) {
      return response.status(404).json({ message: "Album not found" });
    }
    response.status(200).json(album);
  } catch (error) {
    console.error("Error while getting album by id", error);
    next(error);
  }
};
