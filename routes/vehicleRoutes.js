import express from 'express';
import * as vehicleController from '../controllers/vehicleController.js';
import { validateVehicle, validateVehicleUpdate } from '../validators/vehicleValidator.js';

const router = express.Router();

// GET all vehicles
router.get('/', vehicleController.getVehicles);

// GET a single vehicle by ID
router.get('/:id', vehicleController.getVehicleById);

// POST create a new vehicle
router.post('/', validateVehicle, vehicleController.createVehicle);

// PUT update a vehicle
router.put('/:id', validateVehicleUpdate, vehicleController.updateVehicle);

// DELETE a vehicle
router.delete('/:id', vehicleController.deleteVehicle);

export default router;
