import express from "express";

import storeService from "../../domain/StoreBC/Store/storeService";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;
  //   console.log({ data });
  const result = await storeService.addStore(data);

  res.status(result.statusCode).json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await storeService.get(id);

  res.status(result.statusCode).json(result);
});

router.put("/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const result = await storeService.update(id, data);
  res.status(result.statusCode).json(result);
});

export default router;
