const express = require('express');
const router = express.Router();
const { getMyApplications, getJobApplicants, updateStatus } = require('../controllers/applicationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/my', authenticateToken, authorizeRoles('student'), getMyApplications);
router.get('/job/:id', authenticateToken, authorizeRoles('recruiter'), getJobApplicants);
router.put('/:id/status', authenticateToken, authorizeRoles('recruiter'), updateStatus);

module.exports = router;