const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Check if any admin exists
const isFirstAdmin = async () => {
  const adminRole = await Role.findOne({ name: 'admin' });
  if (!adminRole) return true; // No admin role exists

  const adminUser = await User.findOne({ role: adminRole._id });
  return !adminUser; // Return true if no admin user exists
};

// Register the first admin
const registerFirstAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if any admin already exists
    if (!(await isFirstAdmin())) {
      return res.status(400).json({ error: 'An admin already exists. Please log in.' });
    }

    // Find or create the admin role
    let adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
      adminRole = new Role({ name: 'admin' });
      await adminRole.save();
    }

    // Create the first admin user
    const user = new User({
      username,
      password,
      role: adminRole._id,
      isActive: true, // Automatically activate the first admin
    });

    await user.save();
    res.status(201).json({ message: 'First admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

    const token = jwt.sign({ id: user._id, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, registerFirstAdmin  };