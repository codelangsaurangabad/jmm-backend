const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');
const path = require('path'); // Add this line

// Create a new subcategory (Admin only)
const createSubcategory = async (req, res) => {
  const { name, categoryId } = req.body;
  const image = req.file ? req.file.path : null; // Get the uploaded file path

  // Normalize the file path to use forward slashes
  const normalizedImagePath = image ? image.split(path.sep).join('/') : null;

  // Construct the absolute path
  const baseUrl = `${req.protocol}://${req.get('host')}`; // e.g., http://localhost:3000
  const imageUrl = normalizedImagePath ? `${baseUrl}/${normalizedImagePath}` : null;

  try {
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Create the subcategory
    const subcategory = new Subcategory({ name, image: imageUrl, category: categoryId });
    await subcategory.save();

    // Add the subcategory to the category's subcategories array
    category.subcategories.push(subcategory._id);
    await category.save();

    res.status(201).json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get subcategories for a specific category
const getSubcategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params; // Get categoryId from the URL


  try {
    const subcategories = await Subcategory.find({ category: categoryId }); // Find subcategories by category ID
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export the functions
module.exports = { createSubcategory, getSubcategoriesByCategory };