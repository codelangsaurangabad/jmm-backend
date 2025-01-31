const express = require('express');
const { addBusiness } = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
const regionalManagerMiddleware = require('../middleware/regionalManagerMiddleware'); // Ensure only regional managers can add businesses

const router = express.Router();

// Regional Manager-only routes
router.post('/', authMiddleware, regionalManagerMiddleware, addBusiness);

module.exports = router;