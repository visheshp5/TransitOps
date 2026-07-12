import express from "express";

import {
  createMaintenance,
  getMaintenanceRecords,
  closeMaintenance,
} from "../controllers/maintenanceController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// All authenticated users can view maintenance
router.get("/", authMiddleware, getMaintenanceRecords);

// Only Fleet Manager can create maintenance
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.FLEET_MANAGER),
  createMaintenance
);

// Only Fleet Manager can close maintenance
router.patch(
  "/:id/close",
  authMiddleware,
  roleMiddleware(ROLES.FLEET_MANAGER),
  closeMaintenance
);

export default router;