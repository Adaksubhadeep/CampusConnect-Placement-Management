const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/studentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/profile', authenticateToken, authorizeRoles('student'), getProfile);
router.put('/profile', authenticateToken, authorizeRoles('student'), updateProfile);

module.exports = router;