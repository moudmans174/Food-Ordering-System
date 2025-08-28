import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serve uploaded images

// Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}
 
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// Add food item with image
app.post("/api/food/add", upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file.filename;

    const food = new foodModel({ name, description, price, category, image });
    await food.save();

    res.status(201).json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

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
