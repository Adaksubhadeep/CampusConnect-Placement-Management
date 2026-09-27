const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  skills: [{ type: String, index: true }],
  salary: { type: Number, required: true },
  minCgpa: { type: Number, default: 0 },
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Internship'], default: 'Full-Time' },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);