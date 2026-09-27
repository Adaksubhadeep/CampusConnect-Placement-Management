const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  website: { type: String }
});

module.exports = mongoose.model('Company', companySchema);