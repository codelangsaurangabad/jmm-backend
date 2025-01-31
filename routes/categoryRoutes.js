const express = require('express');
const { addCategory, getCategories,getCategoryById } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../config/multer'); // Import multer configuration

const router = express.Router();

// Admin-only routes
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), addCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);

module.exports = router;