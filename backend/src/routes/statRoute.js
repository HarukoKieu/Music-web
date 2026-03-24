import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  response.send("stat route");
});

export default router;
