import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    artist: {
      type: String,
      required: true,
      trim: true,
    },

    album: {
      type: String,
      required: true,
      trim: true,
    },

    imgUrl: {
      type: String,
      required: true,
    },

    songUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: false,
      index: true,
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  },
);

export default mongoose.model("Song", songSchema);
