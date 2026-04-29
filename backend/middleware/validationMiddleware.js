const { validateFeedbackInput } = require('../utils/validators');

// Validation for POST /feedback
const validateCreateFeedback = (req, res, next) => {
  const { isValid, errors } = validateFeedbackInput(req.body);
  
  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
};

// Validation for MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  const mongoose = require('mongoose');
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
  
  next();
};

// Sanitize input to prevent XSS
const sanitizeInput = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.trim().replace(/[<>]/g, '');
  }
  if (req.body.message) {
    req.body.message = req.body.message.trim().replace(/[<>]/g, '');
  }
  if (req.body.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  next();
};

module.exports = {
  validateCreateFeedback,
  validateObjectId,
  sanitizeInput
};