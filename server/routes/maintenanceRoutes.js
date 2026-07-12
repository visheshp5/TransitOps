const express = require("express");

const {
  createMaintenance,
  getMaintenanceRecords,
  closeMaintenance,
} = require("../controllers/maintenanceController");

const router = express.Router();

router.get("/", getMaintenanceRecords);
router.post("/", createMaintenance);
router.patch("/:id/close", closeMaintenance);

module.exports = router;