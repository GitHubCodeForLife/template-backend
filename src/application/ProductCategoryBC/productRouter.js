import express from "express";
import ProductService from "../../domain/ProductCategoryBC/Product/ProductService";
import { getPage, getPageSize } from "../../../utils/Pagination";

const router = express.Router();

router.get("/pending-products", async (req, res) => {
  const result = await ProductService.getPendingProducts();

  res.status(result.statusCode).json(result);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const result = await ProductService.update(id, data);

  res.status(result.statusCode).json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.get(id);

  res.status(result.statusCode).json(result);
});

router.get("/search/:key", async (req, res) => {
  const { key } = req.params;
  const result = await ProductService.searchByKeyword(key);

  res.status(result.statusCode).json(result.data);
});

router.get("/recommend/:key", async (req, res) => {
  const { key } = req.params;
  const result = await ProductService.getRecommendProduct(key);

  res.status(result.statusCode).json(result.data);
});

router.get("/recent-variations/:id", async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getRecentVariations(id);

  res.status(result.statusCode).json(result);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await ProductService.createProduct(data);

  res.status(result.statusCode).json(result);
});

// list of product
router.get("/", async (req, res) => {
  const page = getPage(req.query.page);
  const limit = getPageSize(req.query.limit);

  const result = await ProductService.getAll(page, limit);
  res.status(result.statusCode).json(result.data);
});

export default router;
