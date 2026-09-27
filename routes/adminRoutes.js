const express = require('express');
const router = express.Router();
const { getDashboardStats, toggleUserBlock } = require('../controllers/adminController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/dashboard', authenticateToken, authorizeRoles('admin'), getDashboardStats);
router.put('/users/:id/block', authenticateToken, authorizeRoles('admin'), toggleUserBlock);

module.exports = router;