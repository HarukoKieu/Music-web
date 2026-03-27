import User from "../models/userModel.js";
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
