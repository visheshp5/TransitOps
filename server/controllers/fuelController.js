import Vehicle from "../models/vehicle.js";
import FuelLog from "../models/FuelLog.js";

export const createFuelLog = async (req, res) => {
  try {
    const { vehicle: vehicleId, trip, liters, cost, date, odometer } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (
      liters == null ||
      cost == null ||
      liters <= 0 ||
      cost < 0
    ) {
      return res.status(400).json({
          success: false,
          message: "Invalid fuel data"
      });
  }

    const fuelLog = await FuelLog.create({
      vehicle: vehicleId,
      trip: trip || null,
      liters,
      cost,
      date: date || new Date(),
      odometer,
    });

    return res.status(201).json({
      success: true,
      message: "Fuel log created successfully",
      data: fuelLog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFuelLogs = async (req, res) => {
  try {
    // Get filter values from query parameters
    const { vehicle, trip, startDate, endDate } = req.query;

    // Create empty filter object
    const filter = {};

    // Filter by vehicle
    if (vehicle) {
      filter.vehicle = vehicle;
    }

    // Filter by trip
    if (trip) {
      filter.trip = trip;
    }

    // Filter by date range
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    // Fetch fuel logs using filters
    const logs = await FuelLog.find(filter)
      .populate("vehicle")
      .populate("trip")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};