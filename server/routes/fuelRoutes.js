const express = require("express");

const {
  createFuelLog,
  getFuelLogs,
} = require("../controllers/fuelController.js");

const authMiddleware = require("../middleware/authMiddleware.js");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const { ROLES } = require("../utils/constants.js");

const router = express.Router();

// Authenticated users can view
router.get(
  "/",
  authMiddleware,
  getFuelLogs
);

// Financial Analyst can manually add fuel logs
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.FINANCIAL_ANALYST),
  createFuelLog
);

module.exports = router;