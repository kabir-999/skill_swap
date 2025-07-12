const { body, validationResult } = require('express-validator');

// Helper function to parse skills arrays
const parseSkillsArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch (error) {
      // If JSON parsing fails, treat as comma-separated string
      return value.split(',').map(skill => skill.trim()).filter(Boolean);
    }
  }
  return [value];
};

// Validation rules for user profile
const validateUserProfile = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  
  body('skillsOffered')
    .custom((value) => {
      const skills = parseSkillsArray(value);
      if (skills.length === 0) {
        throw new Error('At least one skill offered is required');
      }
      return true;
    }),
  
  body('skillsWanted')
    .custom((value) => {
      const skills = parseSkillsArray(value);
      if (skills.length === 0) {
        throw new Error('At least one skill wanted is required');
      }
      return true;
    }),
  
  body('availability')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Availability must be between 1 and 200 characters'),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean value')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  
  // Parse skills arrays if they come as JSON strings
  if (req.body.skillsOffered) {
    req.body.skillsOffered = parseSkillsArray(req.body.skillsOffered);
  }
  if (req.body.skillsWanted) {
    req.body.skillsWanted = parseSkillsArray(req.body.skillsWanted);
  }
  
  next();
};

module.exports = {
  validateUserProfile,
  handleValidationErrors
}; 