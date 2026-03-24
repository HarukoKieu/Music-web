import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sendId: {
      type: String,
      required: true,
      index: true,
    },
    receiveId: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  },
);

export default mongoose.model("Message", messageSchema);
