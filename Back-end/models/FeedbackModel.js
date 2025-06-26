const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    feedbackType: {
      type: String,
      enum: ['General Feedback', 'Bug Report', 'Feature Request', 'Suggestion'],
      default: 'General Feedback',
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
