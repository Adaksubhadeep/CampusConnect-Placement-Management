const Application = require('../models/Application');
const Job = require('../models/Job');
const StudentProfile = require('../models/StudentProfile');

exports.applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const studentUserId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job || job.status === 'Closed') {
      return res.status(400).json({ message: 'Job is invalid or closed' });
    }

    const profile = await StudentProfile.findOne({ userId: studentUserId });
    if (!profile) {
      return res.status(400).json({ message: 'Please complete your Student Profile before applying' });
    }

    if (profile.cgpa < job.minCgpa) {
      return res.status(400).json({ 
        message: `Ineligible: Minimum required CGPA is ${job.minCgpa}, your CGPA is ${profile.cgpa}` 
      });
    }

    const newApplication = new Application({
      studentId: studentUserId,
      jobId: jobId,
      resume: profile.resume || 'resume.pdf'
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully' });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Validation Error: You have already applied for this job' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.user.id })
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'companyName' }
      });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getJobApplicants = async (req, res) => {
  try {
    const apps = await Application.find({ jobId: req.params.id })
      .populate('studentId', 'name email');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: 'Status updated successfully', app });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};