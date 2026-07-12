import Maintenance from "../models/Maintenance.js";
import Vehicle from "../models/vehicle.js";

// CREATE MAINTENANCE RECORD
export const createMaintenance = async (req, res) => {
  try {
    const {
      vehicle: vehicleId,
      maintenanceType,
      description,
      cost,
    } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (vehicle.status === "Retired") {
      return res.status(400).json({
        success: false,
        message: "Retired vehicle cannot enter maintenance",
      });
    }

    if (vehicle.status === "On Trip") {
      return res.status(400).json({
        success: false,
        message: "Vehicle currently on trip cannot enter maintenance",
      });
    }

    const activeMaintenance = await Maintenance.findOne({
      vehicle: vehicleId,
      status: "Active",
    });

    if (activeMaintenance) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already has active maintenance",
      });
    }

    const maintenance = await Maintenance.create({
      vehicle: vehicleId,
      maintenanceType,
      description,
      cost,
    });

    // Mandatory automatic status transition
    vehicle.status = "In Shop";
    await vehicle.save();

    return res.status(201).json({
      success: true,
      message: "Maintenance created. Vehicle moved to In Shop.",
      data: maintenance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET MAINTENANCE RECORDS
export const getMaintenanceRecords = async (req, res) => {
  try {
     const { status, vehicle } = req.query;

      const filter = {};

      if (status) {
          filter.status = status;
      }

      if (vehicle) {
          filter.vehicle = vehicle;
       }

      const records = await Maintenance.find(filter)
    
      .populate("vehicle")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// CLOSE MAINTENANCE
export const closeMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance record not found",
      });
    }

    if (maintenance.status === "Closed") {
      return res.status(400).json({
        success: false,
        message: "Maintenance record already closed",
      });
    }

    const vehicle = await Vehicle.findById(maintenance.vehicle);

    maintenance.status = "Closed";
    maintenance.closedAt = new Date();

    await maintenance.save();

    // Restore unless retired
    if (vehicle && vehicle.status !== "Retired") {
      vehicle.status = "Available";
      await vehicle.save();
    }

    return res.status(200).json({
      success: true,
      message: "Maintenance closed successfully",
      data: maintenance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};