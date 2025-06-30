const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['Sales Rep', 'Senior Rep', 'Team Lead', 'Junior Rep'], default: 'Sales Rep' },
  manager: { type: String },
  deals: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
