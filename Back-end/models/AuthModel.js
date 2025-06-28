const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  company: String,
  jobTitle: String,
  companySize: String,
  industry: String,
  password: { type: String, required: true },
  confirmPassword: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  otp: { type: String },
  otpExpiry: { type: Date },

  trialPeriodStart: { type: Date, default: Date.now },
  trialPeriodEnd: { type: Date },
  remainingTime: { type: String },
  joinDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
