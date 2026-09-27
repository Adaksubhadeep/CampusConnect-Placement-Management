const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  cgpa: { type: Number, required: true, min: 0, max: 10 },
  skills: [{ type: String, index: true }],
  resume: { type: String, default: '' },
  graduationYear: { type: Number, required: true }
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);