import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";  // Use your model here

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

// Add food item
app.post("/api/food/add", async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const food = new foodModel({ name, description, price, category, image });
    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// List all food items
app.get("/api/food/list", async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
