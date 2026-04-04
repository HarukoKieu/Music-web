import userModel from "../models/userModel.js";

export const authCallBack = async (request, response, next) => {
  try {
    const { id, username, imgUrl } = request.body;

    let user = await userModel.findOne({ clerkId: id });
    if (!user) {
      user = await userModel.create({
        clerkId: id,
        username,
        imgUrl,
      });
    }

    return response.status(200).json({ user });
  } catch (error) {
    console.error("Error while calling callBack", error);
    next(error);
  }
};
