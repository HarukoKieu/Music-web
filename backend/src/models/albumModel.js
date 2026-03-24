import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
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

    imgUrl: {
      type: String,
      required: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    songs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  },
);

export default mongoose.model("Album", albumSchema);
