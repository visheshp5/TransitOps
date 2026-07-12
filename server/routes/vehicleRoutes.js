import express from 'express';
import * as vehicleController from '../controllers/vehicleController.js';
import { validateVehicle, validateVehicleUpdate } from '../validators/vehicleValidator.js';

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// GET all vehicles
router.get(
    "/",
    authMiddleware,
    vehicleController.getVehicles
);

//GET a single vehicle by ID
router.get(
    "/:id",
    authMiddleware,
    vehicleController.getVehicleById
);

//POST create a new vehicle
router.post(
    "/",
    authMiddleware,
    roleMiddleware(ROLES.FLEET_MANAGER),
    validateVehicle,
    vehicleController.createVehicle
);

//PUT update a vehicle
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLES.FLEET_MANAGER),
    validateVehicleUpdate,
    vehicleController.updateVehicle
);

//DELETE a vehicle
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLES.FLEET_MANAGER),
    vehicleController.deleteVehicle
);


export default router;