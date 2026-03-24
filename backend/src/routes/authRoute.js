import express from "express";

import { authCallBack } from "../controllers/authController.js";

const router = express.Router();

router.post("/callback", authCallBack);

export default router;
