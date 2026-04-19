import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
export const getAllUsers = async (request, response, next) => {
  try {
    const currentUserId = await request.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    response.status(200).json(users);
  } catch (error) {
    console.error("Error while getting all users", error);
    next(error);
  }
};

export const getMessages = async (request, response, next) => {
  try {
    const myId = request.auth.userId;
    const { userId } = request.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    response.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
