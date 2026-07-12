import Vehicle from '../models/vehicle.js';

// Helper for standardized error response
const sendError = (res, status, message, error = null) => {
  return res.status(status).json({
    success: false,
    message,
    error: error ? error.message || error : null
  });
};

// Helper for standardized success response
const sendSuccess = (res, status, message, data = null) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

/**
 * @route   GET /api/vehicles
 * @desc    Get all vehicles (supports filtering by status, type, region, registrationNumber)
 * @access  Public
 */
const getVehicles = async (req, res) => {
  try {
    const { status, type, region, registrationNumber } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (region) filter.region = region;
    if (registrationNumber) {
      // Case-insensitive exact match
      filter.registrationNumber = { $regex: new RegExp(`^${registrationNumber}$`, 'i') };
    }

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
    
    return sendSuccess(res, 200, 'Vehicles retrieved successfully', vehicles);
  } catch (error) {
    return sendError(res, 500, 'Failed to fetch vehicles', error);
  }
};

/**
 * @route   GET /api/vehicles/:id
 * @desc    Get single vehicle by ID
 * @access  Public
 */
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return sendError(res, 404, 'Vehicle not found');
    }
    
    return sendSuccess(res, 200, 'Vehicle retrieved successfully', vehicle);
  } catch (error) {
    if (error.name === 'CastError') {
      return sendError(res, 400, 'Invalid vehicle ID format');
    }
    return sendError(res, 500, 'Failed to fetch vehicle', error);
  }
};

/**
 * @route   POST /api/vehicles
 * @desc    Create a new vehicle
 * @access  Public
 */
const createVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);

    if(req.body.acquisitionCost <= 0){
        return sendError(
            res,
            400,
            "Acquisition cost cannot be negative"
        );
    }
    const savedVehicle = await newVehicle.save();
    
    return sendSuccess(res, 201, 'Vehicle created successfully', savedVehicle);
  } catch (error) {
    // Check for duplicate registrationNumber (MongoDB duplicate key error)
    if (error.code === 11000) {
      return sendError(res, 409, 'Registration number must be unique');
    }
    
    // Check for mongoose validation errors (e.g. required fields, enums)
    if (error.name === 'ValidationError') {
      return sendError(res, 400, 'Validation failed', error);
    }
    
    return sendError(res, 500, 'Failed to create vehicle', error);
  }
};

/**
 * @route   PUT /api/vehicles/:id
 * @desc    Update a vehicle
 * @access  Public
 */
const updateVehicle = async (req, res) => {
  try {
    if (req.body.status) {
        return sendError(
            res,
            400,
            "Vehicle status is managed automatically by trips and maintenance"
        );
    }

    if (req.body.acquisitionCost !== undefined) {
        return sendError(
            res,
            400,
            "Acquisition cost cannot be updated"
        );
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedVehicle) {
      return sendError(res, 404, 'Vehicle not found');
    }

    return sendSuccess(res, 200, 'Vehicle updated successfully', updatedVehicle);
  } catch (error) {
    if (error.code === 11000) {
      return sendError(res, 409, 'Registration number must be unique');
    }
    
    if (error.name === 'ValidationError') {
      return sendError(res, 400, 'Validation failed', error);
    }
    
    if (error.name === 'CastError') {
      return sendError(res, 400, 'Invalid vehicle ID format');
    }

    return sendError(res, 500, 'Failed to update vehicle', error);
  }
};

/**
 * @route   DELETE /api/vehicles/:id
 * @desc    Delete a vehicle
 * @access  Public
 */
const deleteVehicle = async (req, res) => {
  try {

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return sendError(res, 404, "Vehicle not found");
    }

    if (vehicle.status === "On Trip") {
        return sendError(
            res,
            400,
            "Cannot delete a vehicle currently on a trip"
        );
    }

    if (vehicle.status === "In Shop") {
        return sendError(
            res,
            400,
            "Cannot delete a vehicle under maintenance"
        );
    }
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    
    if (!deletedVehicle) {
      return sendError(res, 404, 'Vehicle not found');
    }
    
    return sendSuccess(res, 200, 'Vehicle deleted successfully', deletedVehicle);
  } catch (error) {
    if (error.name === 'CastError') {
      return sendError(res, 400, 'Invalid vehicle ID format');
    }
    return sendError(res, 500, 'Failed to delete vehicle', error);
  }
};

export {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};