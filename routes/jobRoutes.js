const express = require('express');
const router = express.Router();
const { getAllJobs, createJob, getRecruiterJobs } = require('../controllers/jobController');
const { applyForJob } = require('../controllers/applicationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/', getAllJobs);
router.post('/', authenticateToken, authorizeRoles('recruiter'), createJob);
router.get('/recruiter', authenticateToken, authorizeRoles('recruiter'), getRecruiterJobs);
router.post('/:id/apply', authenticateToken, authorizeRoles('student'), applyForJob);

module.exports = router;