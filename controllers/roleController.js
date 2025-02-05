const Role = require('../models/Role');

// Create a new role
const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ error: 'Role already exists' });
    }

    // Create the role
    const role = new Role({ name });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find(); // Fetch all roles
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a role by ID
const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a role by ID
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated role
    );

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a role by ID
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRole, getAllRoles, getRoleById, updateRole, deleteRole };