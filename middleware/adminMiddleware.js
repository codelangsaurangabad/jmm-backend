const User = require('../models/User');
const Role = require('../models/Role');

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('role');
    if (user.role.name !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = adminMiddleware;