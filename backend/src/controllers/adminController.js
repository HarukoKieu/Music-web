import Song from "../models/songModel.js";
import Album from "../models/albumModel.js";
import cloudinary from "../libs/cloudinary.js"; // Thêm dòng này

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
        .json({ message: "Song file and cover image are required" });
    }

    const { title, artist, albumId, duration } = request.body;

    // ✅ Validate required fields
    if (!title || !title.trim()) {
      return response.status(400).json({ message: "Song title is required" });
    }
    if (!artist || !artist.trim()) {
      return response.status(400).json({ message: "Artist name is required" });
    }

    // ✅ Validate duration là số dương
    const durationNum = parseFloat(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      return response
        .status(400)
        .json({ message: "Duration must be a positive number" });
    }

    // ✅ Validate albumId format nếu có
    if (albumId && !albumId.match(/^[0-9a-fA-F]{24}$/)) {
      return response.status(400).json({ message: "Invalid album ID format" });
    }

    const songFile = request.files.songFile;
    const imageFile = request.files.imageFile;

    const songUrl = await uploadToCloudinary(songFile);
    const imgUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title: title.trim(),
      artist: artist.trim(),
      songUrl,
      imgUrl,
      duration: durationNum,
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

    if (!song) {
      return response.status(404).json({ message: "Song not found" });
    }

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
    // ✅ Validate files
    if (!request.files || !request.files.imageFile) {
      return response
        .status(400)
        .json({ message: "Album cover image is required" });
    }

    const { title, artist, releaseYear } = request.body;

    // ✅ Validate required fields
    if (!title || !title.trim()) {
      return response.status(400).json({ message: "Album title is required" });
    }
    if (!artist || !artist.trim()) {
      return response.status(400).json({ message: "Artist name is required" });
    }

    // ✅ Validate releaseYear là số hợp lệ
    const year = parseInt(releaseYear, 10);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      return response.status(400).json({
        message: `Release year must be between 1900 and ${new Date().getFullYear() + 1}`,
      });
    }

    const { imageFile } = request.files;
    const imgUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title: title.trim(),
      artist: artist.trim(),
      releaseYear: year,
      imgUrl,
    });
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

    // ✅ Validate ObjectId format trước
    if (!albumId.match(/^[0-9a-fA-F]{24}$/)) {
      return response.status(400).json({ message: "Invalid album ID format" });
    }

    // ✅ Kiểm tra album có tồn tại không
    const album = await Album.findById(albumId);
    if (!album) {
      return response.status(404).json({ message: "Album not found" });
    }

    // ✅ Xóa songs trước, rồi mới xóa album (đúng thứ tự)
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
