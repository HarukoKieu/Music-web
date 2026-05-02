import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { getAllUsers, getMessages } from "../controllers/userController.js";
const router = express.Router();

router.get("/", protectRoute, getAllUsers);

router.get("/messages/:userId", protectRoute, getMessages);

export default router;
