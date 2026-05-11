import express from "express";
import { authCallBack } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js"; // ✅ Thêm middleware

const router = express.Router();

// ✅ Thêm protectRoute — chỉ user đã auth với Clerk mới được gọi endpoint này
router.post("/callback", protectRoute, authCallBack);

export default router;
