import express from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/songController.js";
import { protectRoute, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trendings", getTrendingSongs);
export default router;
