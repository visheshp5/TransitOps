import express from 'express';
import * as driverController from '../controllers/driveController.js';
import { validateDriver, validateDriverUpdate } from '../validators/driverValidator.js';

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// GET all drivers
router.get("/", authMiddleware, driverController.getDrivers);

//GET a single driver by ID
router.get("/:id", authMiddleware, driverController.getDriverById);

//POST create a new driver
router.post(
    "/",
    authMiddleware,
    roleMiddleware(ROLES.FLEET_MANAGER),
    validateDriver,
    driverController.createDriver
);

//PUT update a driver
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLES.FLEET_MANAGER),
    validateDriverUpdate,
    driverController.updateDriver
);

//DELETE a driver
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLES.FLEET_MANAGER),
    driverController.deleteDriver
);

export default router;