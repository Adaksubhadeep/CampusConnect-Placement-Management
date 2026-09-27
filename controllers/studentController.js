const StudentProfile = require('../models/StudentProfile');

exports.getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user.id }).populate('userId', 'name email');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { phone, college, branch, cgpa, skills, resume, graduationYear } = req.body;
    
    const parsedSkills = typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills;

    let profile = await StudentProfile.findOne({ userId: req.user.id });

    if (profile) {
      profile.phone = phone || profile.phone;
      profile.college = college || profile.college;
      profile.branch = branch || profile.branch;
      profile.cgpa = cgpa !== undefined ? cgpa : profile.cgpa;
      profile.skills = parsedSkills || profile.skills;
      profile.resume = resume || profile.resume;
      profile.graduationYear = graduationYear || profile.graduationYear;
      await profile.save();
    } else {
      profile = new StudentProfile({
        userId: req.user.id,
        phone,
        college,
        branch,
        cgpa,
        skills: parsedSkills,
        resume,
        graduationYear
      });
      await profile.save();
    }

    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};