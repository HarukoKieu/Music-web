import express from "express";
import { getAllAlbums, getAlbumById } from "../controllers/albumController.js";
const router = express.Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;
