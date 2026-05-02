import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import { connectDB } from "./libs/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import songRoute from "./routes/songRoute.js";
import albumRoute from "./routes/albumRoute.js";
import statRoute from "./routes/statRoute.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "fs/promises";
import { createServer } from "http";
import cron from "node-cron";
import { initializeSocket } from "./libs/socket.js";

dotenv.config();

const app = express();

const httpServer = createServer(app);
initializeSocket(httpServer);

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

// Middleware
app.use(express.json()); // Parse JSON request bodies

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDirectory: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
  }),
);

// cron jobs
const tempDirectory = path.join(process.cwd(), "temp");

cron.schedule("0 * * * *", async () => {
  try {
    const files = await fs.readdir(tempDirectory);

    await Promise.all(
      files.map((file) =>
        fs.unlink(path.join(tempDirectory, file)).catch((err) => {
          console.error("Delete error:", err);
        }),
      ),
    );
  } catch (err) {
    console.error("Cron error:", err);
  }
});

// Public routes
app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/songs", songRoute);
app.use("/api/albums", albumRoute);
app.use("/api/stats", statRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "../frontend", "dist", "index.html"),
    );
  });
}

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
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
