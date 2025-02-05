const express = require('express');
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// POST: Create a new role (Admin only)
router.post('/', authMiddleware, adminMiddleware, createRole);

// GET: Get all roles (Admin only)
router.get('/', authMiddleware, adminMiddleware, getAllRoles);

// GET: Get a role by ID (Admin only)
router.get('/:id', authMiddleware, adminMiddleware, getRoleById);

// PUT: Update a role by ID (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, updateRole);

// DELETE: Delete a role by ID (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteRole);

module.exports = router;