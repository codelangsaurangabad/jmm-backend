const express = require('express');
const { createSubcategory, getSubcategoriesByCategory } = require('../controllers/subcategoryController'); // Ensure correct import
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../config/multer'); // Import multer configuration

const router = express.Router();

// POST: Create a new subcategory (Admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createSubcategory);

// GET: Get subcategories for a specific category
router.get('/:categoryId', getSubcategoriesByCategory);

module.exports = router;