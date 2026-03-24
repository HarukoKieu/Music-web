import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  request.auth.userId;
  response.send("user route");
});

export default router;
