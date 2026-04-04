import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    imgUrl: {
      type: String,
      required: true,
    },

    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  },
);

export default mongoose.model("User", userSchema);
