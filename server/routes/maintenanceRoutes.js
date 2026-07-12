const express = require("express");

const {
  createMaintenance,
  getMaintenanceRecords,
  closeMaintenance,
} = require("../controllers/maintenanceController.js");

const authMiddleware = require("../middleware/authMiddleware.js");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const { ROLES } = require("../utils/constants.js");

const router = express.Router();

// All authenticated users can view maintenance
router.get(
  "/",
  authMiddleware,
  getMaintenanceRecords
);

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

module.exports = router;