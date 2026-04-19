import mongoose from "mongoose";
import Album from "../models/albumModel.js";
import dotenv from "dotenv";

dotenv.config();

// Static album data
const albums = [
  {
    title: "Urban Nights",
    artist: "Various Artists",
    imgUrl: "/albums/1.jpg",
    releaseYear: 2024,
  },
  {
    title: "Coastal Dreaming",
    artist: "Various Artists",
    imgUrl: "/albums/2.jpg",
    releaseYear: 2024,
  },
  {
    title: "Midnight Sessions",
    artist: "Various Artists",
    imgUrl: "/albums/3.jpg",
    releaseYear: 2024,
  },
  {
    title: "Eastern Dreams",
    artist: "Various Artists",
    imgUrl: "/albums/4.jpg",
    releaseYear: 2024,
  },
];

const seedAlbums = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);

    // Remove existing albums to avoid duplicates
    await Album.deleteMany({});

    // Insert new albums
    const createdAlbums = await Album.insertMany(albums);

    console.log("✅ Albums seeded successfully!");

    // Log created album IDs (useful for debugging)
    console.log(
      createdAlbums.map((album) => ({
        title: album.title,
        id: album._id,
      })),
    );
  } catch (error) {
    console.error("❌ Error seeding albums:", error);
  } finally {
    // Always close connection
    mongoose.connection.close();
  }
};

seedAlbums();
