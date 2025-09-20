import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET /api/products - list lightweight fields
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}, "name category price thumbnail");
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Server error while fetching products" });
  }
});

// GET /api/products/:id - full product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("❌ Error fetching product:", err.message);
    res.status(500).json({ error: "Server error while fetching product" });
  }
});

export default router;
