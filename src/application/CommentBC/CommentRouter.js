import express from "express";
import commentController from "./CommentController";
import commentService from "../../domain/CommentBC/CommentService";
import { getPage, getPageSize } from "../../../utils/Pagination";

const router = express.Router();

router.get("/", async (req, res) => {
  const reqPage = req.query.page;
  const page = getPage(reqPage);
  const limit = getPageSize(req.query.limit);
  const response = await commentService.getAll(page, limit);
  return res.status(response.statusCode).json(response);
});

// thêm mới một comment
router.post("/", async (req, res) => {
  const data = { ...req.body };
  const result = await commentService.insert(data);
  res.status(result.statusCode).json(result.data);
});
// route tìm comment của một product
router.get("/product/id/:id", async (req, res) => {
  const { id } = req.params;
  const response = await commentService.findByProductId(id);
  return res.status(response.statusCode).json(response);
});

// tìm tất cả comment của user
router.get("/user/id/:id", async (req, res) => {
  const { id } = req.params;
  const response = await commentService.findByUserId(id);
  return res.status(response.statusCode).json(response);
});

// tìm thông tin của user từ comment id
router.get("/userinfo/comment/:id", commentController.findOwnerInfoByCommentId);

// update comment
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await commentService.update(id, data);
  return res.status(result.statusCode).json(result.data);
});

// find by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await commentService.findById(id);
  return res.status(response.statusCode).json(response);
});
export default router;
