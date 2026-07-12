const express = require("express");

const {
  createTrip,
  getTrips,
  getTripById,
  dispatchTrip,
  completeTrip,
  cancelTrip,
} = require("../controllers/tripController");

const router = express.Router();

router.get("/", getTrips);
router.get("/:id", getTripById);
router.post("/", createTrip);
router.patch("/:id/dispatch", dispatchTrip);
router.patch("/:id/complete", completeTrip);
router.patch("/:id/cancel", cancelTrip);

module.exports = router;