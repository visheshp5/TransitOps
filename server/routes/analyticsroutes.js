const express = require("express");

const {
  getDashboardKPIs,
  getVehicleAnalytics,
} = require("../controllers/analyticsController.js");

const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  getDashboardKPIs
);

router.get(
  "/vehicles",
  authMiddleware,
  getVehicleAnalytics
);

module.exports = router;