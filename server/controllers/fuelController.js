const FuelLog = require("../models/FuelLog");
const Vehicle = require("../models/Vehicle");

exports.createFuelLog = async (req, res) => {
  try {
    const { vehicle: vehicleId, trip, liters, cost, date, odometer } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
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

exports.getFuelLogs = async (req, res) => {
  try {
    const logs = await FuelLog.find()
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