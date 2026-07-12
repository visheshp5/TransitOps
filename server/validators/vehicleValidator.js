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

const validateVehicle = [
  body('registrationNumber')
    .notEmpty().withMessage('Registration number is required')
    .isString().withMessage('Registration number must be a string')
    .trim()
    .matches(/^[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z]{1,3}[ -]?\d{4}$/i)
    .withMessage('Invalid registration number format'),
  body('vehicleName')
    .notEmpty().withMessage('Vehicle name is required')
    .isString().withMessage('Vehicle name must be a string'),
  body('model')
    .notEmpty().withMessage('Model is required')
    .isString().withMessage('Model must be a string'),
  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['Truck', 'Van', 'Mini Truck', 'Pickup', 'Container']).withMessage('Invalid vehicle type'),
  body('maxLoadCapacity')
    .notEmpty().withMessage('Max load capacity is required')
    .isNumeric().withMessage('Max load capacity must be a number')
    .custom(value => value >= 1).withMessage('Max load capacity must be at least 1'),
  body('odometer')
    .optional()
    .isNumeric().withMessage('Odometer must be a number')
    .custom(value => value >= 0).withMessage('Odometer cannot be negative'),
  body('acquisitionCost')
    .notEmpty().withMessage('Acquisition cost is required')
    .isNumeric().withMessage('Acquisition cost must be a number'),
  body('region')
    .notEmpty().withMessage('Region is required')
    .isString().withMessage('Region must be a string'),
  body('status')
    .optional()
    .isIn(['Available', 'On Trip', 'In Shop', 'Retired']).withMessage('Invalid status value'),
  validate
];

const validateVehicleUpdate = [
  body('registrationNumber')
    .optional()
    .isString()
    .trim()
    .matches(/^[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z]{1,3}[ -]?\d{4}$/i)
    .withMessage('Invalid registration number format'),
  body('vehicleName').optional().isString(),
  body('model').optional().isString(),
  body('type').optional().isIn(['Truck', 'Van', 'Mini Truck', 'Pickup', 'Container']),
  body('maxLoadCapacity').optional().isNumeric().custom(v => v >= 1),
  body('odometer').optional().isNumeric().custom(v => v >= 0),
  body('acquisitionCost').optional().isNumeric(),
  body('region').optional().isString(),
  body('status').optional().isIn(['Available', 'On Trip', 'In Shop', 'Retired']),
  validate
];

export {
  validateVehicle,
  validateVehicleUpdate
};