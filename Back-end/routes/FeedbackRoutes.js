const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback } = require('../controllers/FeedbackController.js');

// Public route to submit feedback
router.post('/', createFeedback);

// Admin route to get all feedback
router.get('/', getAllFeedback); 

module.exports = router;
