import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product.js";

dotenv.config();

const MONGO =
  process.env.MONGO_URI ||
  "mongodb+srv://verma:verma@cluster0.ngo7e7d.mongodb.net/arnxtdb";

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected...");

    // Clear existing products (optional)
    await Product.deleteMany({});
    console.log("🗑 Existing products removed");

    //  Hard-coded product data
    const product = {
      name: "Modern Lamp",
      description: "The Modern Lamp combines style, functionality, and energy efficiency in a compact design. Its warm LED lighting enhances the ambiance while adding a touch of sophistication to any space. A must-have piece for anyone who appreciates modern home décor with practical lighting.",
      category: "home-decor",
      price: 2499,
      thumbnail: "/image/lamp.png",
      modelUrl: "/models/lamp.glb", 
    };

    // Insert product into MongoDB
    await Product.insertMany([product]);
    console.log("✅ Inserted 1 product into MongoDB");

    // Close connection
    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    await mongoose.connection.close();
  }
}

seed();
