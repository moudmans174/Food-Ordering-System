import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add a food item
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newFood = new foodModel({
      name,
      description,
      price: parseFloat(price),
      image: req.file.filename,
      category,
    });

    await newFood.save();
    return res.status(201).json({ success: true, message: "Food added successfully." });
  } catch (error) {
    console.error("Error adding food:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// List all food items
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    return res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing food:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update a food item
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const updatedData = { name, description, price: parseFloat(price), category };
    if (req.file) {
      const food = await foodModel.findById(id);
      if (food && food.image) {
        // Delete the old image from the filesystem
        fs.unlinkSync(`uploads/${food.image}`);
      }
      updatedData.image = req.file.filename;
    }

    const updatedFood = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }

    return res.status(200).json({ success: true, message: "Food updated successfully.", data: updatedFood });
  } catch (error) {
    console.error("Error updating food:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete a food item
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }

    // Delete the image file
    if (food.image) {
      fs.unlinkSync(`uploads/${food.image}`);
    }

    await foodModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Food item deleted successfully." });
  } catch (error) {
    console.error("Error deleting food:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
