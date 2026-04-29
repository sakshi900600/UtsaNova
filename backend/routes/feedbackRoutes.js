const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  deleteFeedback,
  toggleReviewStatus,
  updateFeedback
} = require('../controllers/feedbackController');
const {
  validateCreateFeedback,
  validateObjectId,
  sanitizeInput
} = require('../middleware/validationMiddleware');


router.post('/', validateCreateFeedback, sanitizeInput, createFeedback);
router.get('/', getAllFeedback);
router.get('/:id', validateObjectId, getFeedbackById);
router.delete('/:id', validateObjectId, deleteFeedback);
router.put('/:id', validateObjectId, toggleReviewStatus);
router.put('/:id/full', 
  validateObjectId,
  sanitizeInput,
  validateCreateFeedback,
  updateFeedback
);

module.exports = router;