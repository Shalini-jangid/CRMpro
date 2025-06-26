const asyncHandler = require('express-async-handler');
const Feedback = require('../models/FeedbackModel');

// Create new feedback


const createFeedback = asyncHandler(async (req, res) => {
  const { fullName, email, company, phone, feedbackType, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  const validTypes = ['General Feedback', 'Bug Report', 'Feature Request', 'Suggestion'];
  const safeFeedbackType = validTypes.includes(feedbackType) ? feedbackType : 'General Feedback';

  const feedback = new Feedback({
    fullName,
    email,
    company,
    phone,
    feedbackType: safeFeedbackType,
    subject,
    message,
  });

  const savedFeedback = await feedback.save();
  res.status(201).json({ message: 'Feedback submitted successfully', data: savedFeedback });
});


//Get all feedback (Admin only use case)
const getAllFeedback = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

module.exports = {
  createFeedback,
  getAllFeedback,
};
