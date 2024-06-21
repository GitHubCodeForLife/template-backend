import { authenticateByJwt } from "application/Authentication/authService";
import express from "express";
import commentController from "./commentController";

const router = express.Router();

router.get("/:productId", commentController.getAll);
router.post("/", authenticateByJwt, commentController.insert);

export default router;
