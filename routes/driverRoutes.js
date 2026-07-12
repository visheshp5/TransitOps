import express from 'express';
import * as driverController from '../controllers/driverController.js';
import { validateDriver, validateDriverUpdate } from '../validators/driverValidator.js';

const router = express.Router();

// GET all drivers
router.get('/', driverController.getDrivers);

// GET a single driver by ID
router.get('/:id', driverController.getDriverById);

// POST create a new driver
router.post('/', validateDriver, driverController.createDriver);

// PUT update a driver
router.put('/:id', validateDriverUpdate, driverController.updateDriver);

// DELETE a driver
router.delete('/:id', driverController.deleteDriver);

export default router;
