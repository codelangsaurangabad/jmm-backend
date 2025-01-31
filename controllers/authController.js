const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  const { username, password, role, isActive } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Find the role
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Create the user
    const user = new User({
      username,
      password,
      role: userRole._id,
      isActive: isActive !== undefined ? isActive : false, // Set isActive based on the request or default to false
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).populate('role');
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if the account is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is inactive. Please contact the admin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };