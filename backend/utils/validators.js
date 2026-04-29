const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validateName = (name) => {
  return name && name.length >= 2 && name.length <= 50;
};

const validateMessage = (message) => {
  return message && message.length >= 10 && message.length <= 500;
};

const validateFeedbackInput = (data) => {
  const errors = {};
  
  if (!data.name || !validateName(data.name)) {
    errors.name = 'Name must be between 2 and 50 characters';
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!data.message || !validateMessage(data.message)) {
    errors.message = 'Message must be between 10 and 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validateName,
  validateMessage,
  validateFeedbackInput
};