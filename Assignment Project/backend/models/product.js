import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    thumbnail: { type: String }, 
    modelUrl: { type: String }, 
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
