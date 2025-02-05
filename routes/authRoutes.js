const express = require('express');
const { register, login, registerFirstAdmin } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Register the first admin (no authentication required)
router.post('/register-first-admin', registerFirstAdmin);

module.exports = router;