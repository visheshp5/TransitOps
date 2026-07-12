const express = require("express");

const {
  createFuelLog,
  getFuelLogs,
} = require("../controllers/fuelController");

const router = express.Router();

router.get("/", getFuelLogs);
router.post("/", createFuelLog);

module.exports = router;