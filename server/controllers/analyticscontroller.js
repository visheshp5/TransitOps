const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");
const Maintenance = require("../models/Maintenance");
const FuelLog = require("../models/FuelLog");
const Expense = require("../models/Expense");

// ==========================================
// DASHBOARD KPIs
// ==========================================
exports.getDashboardKPIs = async (req, res) => {
  try {
    const [
      totalVehicles,
      availableVehicles,
      activeVehicles,
      vehiclesInMaintenance,
      activeTrips,
      pendingTrips,
      driversOnDuty,
    ] = await Promise.all([
      Vehicle.countDocuments({ status: { $ne: "Retired" } }),
      Vehicle.countDocuments({ status: "Available" }),
      Vehicle.countDocuments({ status: "On Trip" }),
      Vehicle.countDocuments({ status: "In Shop" }),
      Trip.countDocuments({ status: "Dispatched" }),
      Trip.countDocuments({ status: "Draft" }),
      Driver.countDocuments({ status: "On Trip" }),
    ]);

    const fleetUtilization =
      totalVehicles > 0
        ? Number(((activeVehicles / totalVehicles) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalVehicles,
        activeVehicles,
        availableVehicles,
        vehiclesInMaintenance,
        activeTrips,
        pendingTrips,
        driversOnDuty,
        fleetUtilization,
      },
    });
  } catch (error) {
    console.error("Dashboard KPI error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to calculate dashboard KPIs",
    });
  }
};


// ==========================================
// VEHICLE ANALYTICS
// ==========================================
exports.getVehicleAnalytics = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    const analytics = await Promise.all(
      vehicles.map(async (vehicle) => {
        const [
          completedTrips,
          fuelLogs,
          maintenanceRecords,
          expenses,
        ] = await Promise.all([
          Trip.find({
            vehicle: vehicle._id,
            status: "Completed",
          }),

          FuelLog.find({
            vehicle: vehicle._id,
          }),

          Maintenance.find({
            vehicle: vehicle._id,
          }),

          Expense.find({
            vehicle: vehicle._id,
          }),
        ]);

        // Total actual distance
        const totalDistance = completedTrips.reduce(
          (sum, trip) => sum + (trip.actualDistance || 0),
          0
        );

        // Total fuel consumed
        const totalFuel = fuelLogs.reduce(
          (sum, log) => sum + (log.liters || 0),
          0
        );

        // Total fuel cost
        const totalFuelCost = fuelLogs.reduce(
          (sum, log) => sum + (log.cost || 0),
          0
        );

        // Total maintenance cost
        const totalMaintenanceCost = maintenanceRecords.reduce(
          (sum, record) => sum + (record.cost || 0),
          0
        );

        // Other expenses
        const totalOtherExpenses = expenses.reduce(
          (sum, expense) => sum + (expense.amount || 0),
          0
        );

        // Total revenue
        const totalRevenue = completedTrips.reduce(
          (sum, trip) => sum + (trip.revenue || 0),
          0
        );

        // Required operational cost:
        // Fuel + Maintenance
        const operationalCost =
          totalFuelCost + totalMaintenanceCost;

        // Complete cost including other expenses
        const totalCost =
          operationalCost + totalOtherExpenses;

        // Fuel Efficiency = Distance / Fuel
        const fuelEfficiency =
          totalFuel > 0
            ? Number((totalDistance / totalFuel).toFixed(2))
            : 0;

        // ROI =
        // (Revenue - (Maintenance + Fuel)) / Acquisition Cost
        const acquisitionCost = Number(vehicle.acquisitionCost) || 0;

        const roi =
          acquisitionCost > 0
            ? Number(
                (
                  ((totalRevenue - operationalCost) /
                    acquisitionCost) *
                  100
                ).toFixed(2)
              )
            : 0;

        return {
          vehicleId: vehicle._id,
          registrationNumber: vehicle.registrationNumber,
          vehicleName: vehicle.vehicleName,
          model: vehicle.model || "",
          type: vehicle.type,
          region: vehicle.region || "",
          status: vehicle.status,

          completedTrips: completedTrips.length,

          totalDistance,
          totalFuel,
          fuelEfficiency,

          totalFuelCost,
          totalMaintenanceCost,
          totalOtherExpenses,

          operationalCost,
          totalCost,

          totalRevenue,
          acquisitionCost,
          roi,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: analytics.length,
      data: analytics,
    });
  } catch (error) {
    console.error("Vehicle analytics error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to calculate vehicle analytics",
    });
  }
};