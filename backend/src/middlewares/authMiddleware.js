import { clerkClient } from "@clerk/express";

export const protectRoute = async (request, response, next) => {
  if (!request.auth || !request.auth.userId) {
    return response
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }
  next();
};

export const requireAdmin = async (request, response, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(request.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return response.status(403).json({
        message: "Forbidden - you must be an admin",
      });
    }
    next();
  } catch (error) {
    console.error("Error while calling requireAdmin", error);
    next(error);
  }
};

export default protectRoute;
