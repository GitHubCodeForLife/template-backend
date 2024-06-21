import express from "express";
import CartService from "../../domain/Cart/CartService";

const router = express.Router();

// UPDATE
router.put("/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const result = await CartService.update(id, data);

  res.status(result.statusCode).json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await CartService.get(id);

  res.status(result.statusCode).json(result);
});

router.get("/userid/:userId", async (req, res) => {
  const { userId } = req.params;
  const result = await CartService.getByUserId(userId);

  res.status(result.statusCode).json(result);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await CartService.addToCart(
    data.user_id,
    data.product_id,
    data.quantity,
    data.product_variation_id,
  );
  res.status(result.statusCode).json(result);
});

router.delete("/", async (req, res) => {
  const data = req.body;
  const result = await CartService.restartCart(data.user_id);
  res.status(result.statusCode).json(result);
});
export default router;
