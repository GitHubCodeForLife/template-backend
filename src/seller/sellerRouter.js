import express, { Router } from "express";
import upload from "../../helper/file/FileUpload";
import sellerController from "./sellerController";
import SellerValidation from "./sellerValidate";
import { authenticateByJwt } from "../auth/auth.services";
const router = express.Router();

router.post("/login", sellerController.handleLogin);

router.get("/", sellerController.getAll);
router.post(
  "/",
  SellerValidation.registerValidation,
  sellerController.createASeller
);
router.get("/products", authenticateByJwt, sellerController.getAllProduct);
router.get("/:id", sellerController.get);
router.post("/test", sellerController.test);
router.post("/upload", upload.single("file"), sellerController.upload);
router.post(
  "/upload-video",
  upload.single("file"),
  sellerController.uploadVideo
);

export default router;
