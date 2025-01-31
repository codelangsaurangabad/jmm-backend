const Category = require('../models/Category');
const path = require('path');

// Add a new category with a file (Admin only)
const addCategory = async (req, res) => {
    const { name } = req.body;
    const image = req.file ? req.file.path : null; // Get the uploaded file path

    // Normalize the file path to use forward slashes
    const normalizedImagePath = image ? image.split(path.sep).join('/') : null;

    // Construct the absolute path
    const baseUrl = `${req.protocol}://${req.get('host')}`; // e.g., http://localhost:3000
    const imageUrl = normalizedImagePath ? `${baseUrl}/${normalizedImagePath}` : null;

    try {
        const category = new Category({ name, image: imageUrl }); // Save the absolute path
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategories');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
    const { id } = req.params; // Get category ID from the URL

    try {
        const category = await Category.findById(id).populate('subcategories'); // Fetch category and populate subcategories
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { addCategory, getCategories, getCategoryById };