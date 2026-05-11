import userModel from "../models/userModel.js";
import { clerkClient } from "@clerk/express";

export const authCallBack = async (request, response, next) => {
  try {
    // ✅ Không tin vào body — dùng userId đã được Clerk verify từ middleware
    if (!request.auth || !request.auth.userId) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const clerkUserId = request.auth.userId;

    // ✅ Lấy thông tin user từ Clerk (đã authenticated), không từ body
    const clerkUser = await clerkClient.users.getUser(clerkUserId);

    const firstName = clerkUser.firstName || "";
    const lastName = clerkUser.lastName || "";
    // ✅ Fix Bug #8: tránh "John null"
    const fullName =
      [firstName, lastName].filter(Boolean).join(" ") || "Anonymous";
    const imgUrl = clerkUser.imageUrl;

    let user = await userModel.findOne({ clerkId: clerkUserId });
    if (!user) {
      user = await userModel.create({
        clerkId: clerkUserId,
        fullName,
        imgUrl,
      });
    } else {
      // ✅ Cập nhật thông tin nếu user đã tồn tại (avatar mới, tên mới...)
      user = await userModel.findOneAndUpdate(
        { clerkId: clerkUserId },
        { fullName, imgUrl },
        { new: true },
      );
    }

    return response.status(200).json({ user });
  } catch (error) {
    console.error("Error while calling callBack", error);
    next(error);
  }
};
