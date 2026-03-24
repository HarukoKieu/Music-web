import Song from "../models/songModel.js";
import Album from "../models/albumModel.js";

// helper function to upload files to cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error while uploading file to cloudinary", error);
    throw new Error("Error while uploading file to cloudinary");
  }
};

export const createSong = async (request, response, next) => {
  try {
    if (!request.files || !request.files.songFile || !request.files.imageFile) {
      return response
        .status(400)
        .json({ message: "Song and image files are required" });
    }

    const { title, artist, albumId, duration } = request.body;
    const songFile = request.files.songFile;
    const imageFile = request.files.imageFile;

    const songUrl = await uploadToCloudinary(songFile);
    const imgUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      songUrl,
      imgUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }

    response.status(201).json(song);
  } catch (error) {
    console.error("Error while creating song", error);
    next(error);
  }
};

export const deleteSong = async (request, response, next) => {
  try {
    const { songId } = request.params;
    const song = await Song.findById(songId);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(songId);
    response.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error while deleting song", error);
    next(error);
  }
};

export const createAlbum = async (request, response, next) => {
  try {
    const { title, artist, releaseYear } = request.body;

    const { imageFile } = request.files;
    const imgUrl = await uploadToCloudinary(imageFile);

    const album = new Album({ title, artist, releaseYear, imgUrl });
    await album.save();
    response.status(201).json(album);
  } catch (error) {
    console.error("Error while creating album", error);
    next(error);
  }
};

export const deleteAlbum = async (request, response, next) => {
  try {
    const { albumId } = request.params;
    await Song.deleteMany({ albumId: albumId });
    await Album.findByIdAndDelete(albumId);
    response.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error while deleting album", error);
    next(error);
  }
};

export const checkAdmin = async (request, response, next) => {
  try {
    response.status(200).json({ admin: true });
  } catch (error) {
    console.error("Error while checking admin", error);
    next(error);
  }
};
