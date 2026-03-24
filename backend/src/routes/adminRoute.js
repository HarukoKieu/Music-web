import express from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/adminController.js";
import { protectRoute, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:songId", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:albumId", deleteAlbum);
export default router;
