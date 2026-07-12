import Vehicle from "../models/vehicle.js";
import Driver from "../models/driver.js";
import Trip from "../models/Trip.js";
import FuelLog from "../models/FuelLog.js";

// ==========================================
// CREATE TRIP
// ==========================================
export const createTrip = async (req, res) => {
  try {
    const {
      source,
      destination,
      vehicle: vehicleId,
      driver: driverId,
      cargoWeight,
      plannedDistance,
      revenue,
    } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    const driver = await Driver.findById(driverId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    // Vehicle must be available
    if (vehicle.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: `Vehicle is currently ${vehicle.status} and cannot be assigned`,
      });
    }

    // Explicitly block retired and in-shop vehicles
    if (["Retired", "In Shop", "On Trip"].includes(vehicle.status)) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available for dispatch",
      });
    }

    // Driver must be available
    if (driver.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: `Driver is currently ${driver.status} and cannot be assigned`,
      });
    }

    // Suspended drivers cannot be assigned
    if (driver.status === "Suspended") {
      return res.status(400).json({
        success: false,
        message: "Suspended driver cannot be assigned",
      });
    }

    // License validation
    if (new Date(driver.licenseExpiry) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Driver license has expired",
      });
    }

    // Cargo capacity validation
    if (Number(cargoWeight) > Number(vehicle.maxLoadCapacity)) {
      return res.status(400).json({
        success: false,
        message: `Cargo weight exceeds vehicle capacity of ${vehicle.maxLoadCapacity} kg`,
      });
    }

    const trip = await Trip.create({
      source,
      destination,
      vehicle: vehicleId,
      driver: driverId,
      cargoWeight,
      plannedDistance,
      revenue: revenue || 0,
      startOdometer: vehicle.odometer || 0,
      createdBy: req.user?._id,
    });

    const populatedTrip = await Trip.findById(trip._id)
      .populate("vehicle")
      .populate("driver");

    return res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: populatedTrip,
    });
  } catch (error) {
    console.error("Create trip error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create trip",
    });
  }
};


// ==========================================
// GET ALL TRIPS
// ==========================================
export const getTrips = async (req, res) => {
  try {
    const {
        status,
        vehicle,
        driver,
        source,
        destination,
    } = req.query;

    const filter = {};

    if (status) {
       filter.status = status;
    }

    if (vehicle) {
       filter.vehicle = vehicle;
    }

    if (driver) {
       filter.driver = driver;
    }

    if (source) {
       filter.source = {
       $regex: source,
       $options: "i",
        };
    }

    if (destination) {
       filter.destination = {
       $regex: destination,
       $options: "i",
       };
    }
    

    const trips = await Trip.find(filter)
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// GET SINGLE TRIP
// ==========================================
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("vehicle")
      .populate("driver");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// DISPATCH TRIP
// ==========================================
export const dispatchTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    if (trip.status !== "Draft") {
      return res.status(400).json({
        success: false,
        message: "Only Draft trips can be dispatched",
      });
    }

    const vehicle = await Vehicle.findById(trip.vehicle);
    const driver = await Driver.findById(trip.driver);

    if (!vehicle || !driver) {
      return res.status(404).json({
        success: false,
        message: "Assigned vehicle or driver not found",
      });
    }

    // Revalidate at dispatch time
    if (vehicle.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is no longer available",
      });
    }

    if (driver.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Driver is no longer available",
      });
    }

    if (new Date(driver.licenseExpiry) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Driver license has expired",
      });
    }

    if (Number(trip.cargoWeight) > Number(vehicle.maxLoadCapacity)) {
      return res.status(400).json({
        success: false,
        message: "Cargo exceeds vehicle capacity",
      });
    }

    // Update all statuses
    trip.status = "Dispatched";
    trip.dispatchedAt = new Date();

    vehicle.status = "On Trip";
    driver.status = "On Trip";

    await Promise.all([
      trip.save(),
      vehicle.save(),
      driver.save(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Trip dispatched successfully",
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// COMPLETE TRIP
// ==========================================
export const completeTrip = async (req, res) => {
  try {
    const { endOdometer, fuelConsumed, fuelCost } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    if (trip.status !== "Dispatched") {
      return res.status(400).json({
        success: false,
        message: "Only dispatched trips can be completed",
      });
    }

    const vehicle = await Vehicle.findById(trip.vehicle);
    const driver = await Driver.findById(trip.driver);

    if (!vehicle || !driver) {
      return res.status(404).json({
        success: false,
        message: "Vehicle or driver not found",
      });
    }

    const finalOdometer = Number(endOdometer);
    const startingOdometer = Number(trip.startOdometer);

    if (
      !Number.isFinite(finalOdometer) ||
      finalOdometer < startingOdometer
    ) {
      return res.status(400).json({
        success: false,
        message: `Final odometer must be at least ${startingOdometer}`,
      });
    }

    const actualDistance = finalOdometer - startingOdometer;

    if (
      Number(fuelConsumed) > 0 &&
      actualDistance > 0 &&
      Number(fuelConsumed) > actualDistance
    ) {
      return res.status(400).json({
        success: false,
        message: "Fuel consumed cannot exceed the distance travelled.",
      });
    }

    trip.endOdometer = finalOdometer;
    trip.actualDistance = actualDistance;
    trip.fuelConsumed = Number(fuelConsumed) || 0;
    trip.status = "Completed";
    trip.completedAt = new Date();

    vehicle.odometer = finalOdometer;

    // Don't restore a retired vehicle
    if (vehicle.status !== "Retired") {
      vehicle.status = "Available";
    }

    driver.status = "Available";

    await Promise.all([
      trip.save(),
      vehicle.save(),
      driver.save(),
    ]);

    // Automatically create fuel log
    if (Number(fuelConsumed) > 0) {
      await FuelLog.create({
        vehicle: vehicle._id,
        trip: trip._id,
        liters: Number(fuelConsumed),
        cost: Number(fuelCost) || 0,
        odometer: finalOdometer,
        date: new Date(),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip completed successfully",
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// CANCEL TRIP
// ==========================================
export const cancelTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    if (["Completed", "Cancelled"].includes(trip.status)) {
      return res.status(400).json({
        success: false,
        message: `${trip.status} trip cannot be cancelled`,
      });
    }

    // Restore resources only for dispatched trips
    if (trip.status === "Dispatched") {
      const vehicle = await Vehicle.findById(trip.vehicle);
      const driver = await Driver.findById(trip.driver);

      if (vehicle && vehicle.status !== "Retired") {
        vehicle.status = "Available";
        await vehicle.save();
      }

      if (driver && driver.status !== "Suspended") {
        driver.status = "Available";
        await driver.save();
      }
    }

    trip.status = "Cancelled";
    trip.cancelledAt = new Date();

    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Trip cancelled successfully",
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};