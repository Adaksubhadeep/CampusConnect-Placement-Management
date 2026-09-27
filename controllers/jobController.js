const Job = require('../models/Job');
const Company = require('../models/Company');

exports.getAllJobs = async (req, res) => {
  try {
    const { title, skills, location } = req.query;
    let query = { status: 'Open' };

    if (title) query.title = { $regex: title, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (skills) query.skills = { $in: skills.split(',').map(s => s.trim()) };

    const jobs = await Job.find(query).populate('companyId', 'companyName location website');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { companyName, description: compDesc, location: compLoc, website, title, description, skills, salary, minCgpa, location, jobType, deadline } = req.body;

    let company = await Company.findOne({ recruiterId: req.user.id });
    if (!company) {
      company = new Company({
        recruiterId: req.user.id,
        companyName,
        description: compDesc,
        location: compLoc,
        website
      });
      await company.save();
    }

    const parsedSkills = typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills;

    const newJob = new Job({
      companyId: company._id,
      title,
      description,
      skills: parsedSkills,
      salary,
      minCgpa,
      location,
      jobType,
      deadline
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRecruiterJobs = async (req, res) => {
  try {
    const company = await Company.findOne({ recruiterId: req.user.id });
    if (!company) return res.json([]);
    
    const jobs = await Job.find({ companyId: company._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};