const User = require('../models/User');
const Role = require('../models/Role');

const regionalManagerMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('role');
    if (user.role.name !== 'regionalManager') {
      return res.status(403).json({ error: 'Access denied. Regional Manager only.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = regionalManagerMiddleware;