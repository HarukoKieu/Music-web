import userModel from "../models/userModel.js";

export const authCallBack = async (request, response, next) => {
  try {
    const { id, username, lastName, firstName, imgUrl } = request.body;

    const user = await userModel.findOne({ id });
    if (!user) {
      await userModel.create({
        clerkId: id,
        username,
        displayName: `${firstName} ${lastName}`.trim(),
        imgUrl,
      });
      return response.status(200).json(user);
    }
  } catch (error) {
    console.error("Error while calling callBack", error);
    next(error);
  }
};
