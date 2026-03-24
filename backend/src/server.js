import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./libs/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import songRoute from "./routes/songRoute.js";
import albumRoute from "./routes/albumRoute.js";
import statRoute from "./routes/statRoute.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDirectory: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  }),
);
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Public routes
app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/songs", songRoute);
app.use("/api/albums", albumRoute);
app.use("/api/stats", statRoute);

// error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
