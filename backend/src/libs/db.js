import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1); // Exit the process with an error code
  }
};
