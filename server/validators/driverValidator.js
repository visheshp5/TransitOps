import { body, validationResult } from 'express-validator';

// Helper to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: errors.array()
    });
  }
  next();
};

const validateDriver = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('licenseNumber')
    .notEmpty().withMessage('License number is required')
    .isString().withMessage('License number must be a string'),
  body('licenseCategory')
    .notEmpty().withMessage('License category is required')
    .isString().withMessage('License category must be a string'),
  body('licenseExpiryDate')
    .notEmpty().withMessage('License expiry date is required')
    .isISO8601().withMessage('License expiry date must be a valid date'),
  body('contactNumber')
    .notEmpty().withMessage('Contact number is required')
    .isString().withMessage('Contact number must be a string'),
  body('safetyScore')
    .optional()
    .isNumeric().withMessage('Safety score must be a number')
    .custom(value => value >= 0 && value <= 100).withMessage('Safety score must be between 0 and 100'),
  body('status')
    .optional()
    .isIn(['Available', 'On Trip', 'Off Duty', 'Suspended']).withMessage('Invalid status value'),
  validate
];

const validateDriverUpdate = [
  body('name').optional().isString(),
  body('licenseNumber').optional().isString(),
  body('licenseCategory').optional().isString(),
  body('licenseExpiryDate').optional().isISO8601(),
  body('contactNumber').optional().isString(),
  body('safetyScore').optional().isNumeric().custom(v => v >= 0 && v <= 100),
  body('status').optional().isIn(['Available', 'On Trip', 'Off Duty', 'Suspended']),
  validate
];

export {
  validateDriver,
  validateDriverUpdate
};