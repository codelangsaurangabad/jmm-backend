const express = require('express');
const { activateUser, deactivateUser, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Activate a user account (Admin only)
router.patch('/:userId/activate', authMiddleware, adminMiddleware, activateUser);

// Deactivate a user account (Admin only)
router.patch('/:userId/deactivate', authMiddleware, adminMiddleware, deactivateUser);

// GET: Get all users with their roles (Admin only)
router.get('/', authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;