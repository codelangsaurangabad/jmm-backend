const User = require('../models/User');

// Activate a user account
const activateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isActive = true;
    await user.save();

    res.json({ message: 'User account activated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deactivate a user account
const deactivateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: 'User account deactivated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users with their roles
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate('role', 'name'); // Fetch users and populate the role field
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { activateUser, deactivateUser,getAllUsers };