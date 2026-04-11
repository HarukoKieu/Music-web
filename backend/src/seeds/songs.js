import mongoose from "mongoose";
import Song from "../models/songModel.js";
import dotenv from "dotenv";

dotenv.config();

const songs = [
  {
    title: "Stay With Me",
    artist: "Sarah Mitchell",
    imgUrl: "/cover-images/1.jpg",
    songUrl: "/songs/1.mp3",
    duration: 46, // 0:46
  },
  {
    title: "Midnight Drive",
    artist: "The Wanderers",
    imgUrl: "/cover-images/2.jpg",
    songUrl: "/songs/2.mp3",
    duration: 41, // 0:41
  },
  {
    title: "Lost in Tokyo",
    artist: "Electric Dreams",
    imgUrl: "/cover-images/3.jpg",
    songUrl: "/songs/3.mp3",
    duration: 24, // 0:24
  },
  {
    title: "Summer Daze",
    artist: "Coastal Kids",
    imgUrl: "/cover-images/4.jpg",
    songUrl: "/songs/4.mp3",
    duration: 24, // 0:24
  },
  {
    title: "Neon Lights",
    artist: "Night Runners",
    imgUrl: "/cover-images/5.jpg",
    songUrl: "/songs/5.mp3",
    duration: 36, // 0:36
  },
  {
    title: "Mountain High",
    artist: "The Wild Ones",
    imgUrl: "/cover-images/6.jpg",
    songUrl: "/songs/6.mp3",
    duration: 40, // 0:40
  },
  {
    title: "City Rain",
    artist: "Urban Echo",
    imgUrl: "/cover-images/7.jpg",
    songUrl: "/songs/7.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Desert Wind",
    artist: "Sahara Sons",
    imgUrl: "/cover-images/8.jpg",
    songUrl: "/songs/8.mp3",
    duration: 28, // 0:28
  },
  {
    title: "Ocean Waves",
    artist: "Coastal Drift",
    imgUrl: "/cover-images/9.jpg",
    songUrl: "/songs/9.mp3",
    duration: 28, // 0:28
  },
  {
    title: "Starlight",
    artist: "Luna Bay",
    imgUrl: "/cover-images/10.jpg",
    songUrl: "/songs/10.mp3",
    duration: 30, // 0:30
  },
  {
    title: "Winter Dreams",
    artist: "Arctic Pulse",
    imgUrl: "/cover-images/11.jpg",
    songUrl: "/songs/11.mp3",
    duration: 29, // 0:29
  },
  {
    title: "Purple Sunset",
    artist: "Dream Valley",
    imgUrl: "/cover-images/12.jpg",
    songUrl: "/songs/12.mp3",
    duration: 17, // 0:17
  },
  {
    title: "Neon Dreams",
    artist: "Cyber Pulse",
    imgUrl: "/cover-images/13.jpg",
    songUrl: "/songs/13.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Moonlight Dance",
    artist: "Silver Shadows",
    imgUrl: "/cover-images/14.jpg",
    songUrl: "/songs/14.mp3",
    duration: 27, // 0:27
  },
  {
    title: "Urban Jungle",
    artist: "City Lights",
    imgUrl: "/cover-images/15.jpg",
    songUrl: "/songs/15.mp3",
    duration: 36, // 0:36
  },
  {
    title: "Crystal Rain",
    artist: "Echo Valley",
    imgUrl: "/cover-images/16.jpg",
    songUrl: "/songs/16.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Neon Tokyo",
    artist: "Future Pulse",
    imgUrl: "/cover-images/17.jpg",
    songUrl: "/songs/17.mp3",
    duration: 39, // 0:39
  },
  {
    title: "Midnight Blues",
    artist: "Jazz Cats",
    imgUrl: "/cover-images/18.jpg",
    songUrl: "/songs/18.mp3",
    duration: 29, // 0:29
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    // Clear existing songs
    await Song.deleteMany({});

    // Insert new songs
    await Song.insertMany(songs);

    console.log("Songs seeded successfully!");
  } catch (error) {
    console.error("Error seeding songs:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();
