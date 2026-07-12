const express = require("express");

const {
  createTrip,
  getTrips,
  getTripById,
  dispatchTrip,
  completeTrip,
  cancelTrip,
} = require("../controllers/tripController.js");

const authMiddleware = require("../middleware/authMiddleware.js");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const { ROLES } = require("../utils/constants.js");

const router = express.Router();

// All authenticated users can view trips
router.get("/", authMiddleware, getTrips);

router.get("/:id", authMiddleware, getTripById);

// Dispatcher creates trips
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.DISPATCHER),
  createTrip
);

// Dispatcher dispatches trips
router.patch(
  "/:id/dispatch",
  authMiddleware,
  roleMiddleware(ROLES.DISPATCHER),
  dispatchTrip
);

// Dispatcher completes trips
router.patch(
  "/:id/complete",
  authMiddleware,
  roleMiddleware(ROLES.DISPATCHER),
  completeTrip
);

// Dispatcher cancels trips
router.patch(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware(ROLES.DISPATCHER),
  cancelTrip
);

module.exports = router;