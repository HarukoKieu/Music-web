import mongoose from "mongoose";
import Song from "../models/songModel.js";
import Album from "../models/albumModel.js";
import dotenv from "dotenv";

dotenv.config();

const seedSongs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);

    // Remove existing songs
    await Song.deleteMany({});

    // Fetch all albums from database
    const albums = await Album.find();

    // Safety check: ensure albums exist before creating songs
    if (albums.length === 0) {
      throw new Error("No albums found. Please run seedAlbums first.");
    }

    // Create songs and assign each one to an album
    const songs = [
      // Album 1
      {
        title: "City Rain",
        artist: "Urban Echo",
        album: albums[0]._id,
        imgUrl: "/cover-images/7.jpg",
        songUrl: "/songs/7.mp3",
        duration: 39,
      },
      {
        title: "Neon Lights",
        artist: "Night Runners",
        album: albums[0]._id,
        imgUrl: "/cover-images/5.jpg",
        songUrl: "/songs/5.mp3",
        duration: 36,
      },

      // Album 2
      {
        title: "Summer Daze",
        artist: "Coastal Kids",
        album: albums[1]._id,
        imgUrl: "/cover-images/4.jpg",
        songUrl: "/songs/4.mp3",
        duration: 24,
      },
      {
        title: "Ocean Waves",
        artist: "Coastal Drift",
        album: albums[1]._id,
        imgUrl: "/cover-images/9.jpg",
        songUrl: "/songs/9.mp3",
        duration: 28,
      },

      // Album 3
      {
        title: "Stay With Me",
        artist: "Sarah Mitchell",
        album: albums[2]._id,
        imgUrl: "/cover-images/1.jpg",
        songUrl: "/songs/1.mp3",
        duration: 46,
      },
      {
        title: "Midnight Drive",
        artist: "The Wanderers",
        album: albums[2]._id,
        imgUrl: "/cover-images/2.jpg",
        songUrl: "/songs/2.mp3",
        duration: 41,
      },

      // Album 4
      {
        title: "Lost in Tokyo",
        artist: "Electric Dreams",
        album: albums[3]._id,
        imgUrl: "/cover-images/3.jpg",
        songUrl: "/songs/3.mp3",
        duration: 24,
      },
      {
        title: "Neon Tokyo",
        artist: "Future Pulse",
        album: albums[3]._id,
        imgUrl: "/cover-images/17.jpg",
        songUrl: "/songs/17.mp3",
        duration: 39,
      },
    ];

    // Insert songs into database
    const createdSongs = await Song.insertMany(songs);

    // Update each album with its related songs
    for (let album of albums) {
      const albumSongs = createdSongs.filter(
        (song) => song.album.toString() === album._id.toString(),
      );

      await Album.findByIdAndUpdate(album._id, {
        songs: albumSongs.map((s) => s._id),
      });
    }

    console.log("✅ Songs seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding songs:", error);
  } finally {
    // Close database connection
    mongoose.connection.close();
  }
};

seedSongs();
