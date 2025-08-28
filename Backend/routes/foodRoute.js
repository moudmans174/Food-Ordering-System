
import express from "express";
import multer from "multer";
import { addFood, listFood, updateFood, deleteFood } from "../controllers/foodController.js";

const router = express.Router();

// Set up storage engine for image uploads
const storage = multer.diskStorage({
  destination: "uploads/", // stores image to this folder
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Make the filename unique
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size of 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed."), false); // Reject non-image files
    }
    cb(null, true); // Accept the file
  },
});

// Routes
// POST route to add a new food item
router.post("/add", upload.single("image"), addFood);

// GET route to list all food items
router.get("/list", listFood);

// PUT route to update an existing food item
router.put("/update/:id", upload.single("image"), updateFood);

// DELETE route to remove a food item
router.delete("/delete/:id", deleteFood);

export default router;
