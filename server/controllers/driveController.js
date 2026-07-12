import Driver from '../models/driver.js';
import { isLicenseExpired } from '../utils/driverUtils.js';

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
 * @route   GET /api/drivers
 * @desc    Get all drivers (supports filtering by status, name, licenseNumber, licenseExpired)
 * @access  Public
 */
const getDrivers = async (req, res) => {
  try {
    const { status, name, licenseNumber, licenseExpired } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Case-insensitive partial match
    }
    
    if (licenseNumber) {
      filter.licenseNumber = { $regex: new RegExp(`^${licenseNumber}$`, 'i') }; // Case-insensitive exact match
    }

    if (licenseExpired === 'true') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filter.licenseExpiryDate = { $lt: today };
    } else if (licenseExpired === 'false') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filter.licenseExpiryDate = { $gte: today };
    }

    const drivers = await Driver.find(filter).sort({ createdAt: -1 });
    
    // Example of using the helper function on the response just to append a boolean field if desired,
    // though the DB query already filters correctly.
    const driversWithExpiryFlag = drivers.map(driver => ({
      ...driver.toObject(),
      isExpired: isLicenseExpired(driver.licenseExpiryDate)
    }));

    return sendSuccess(res, 200, 'Drivers retrieved successfully', driversWithExpiryFlag);
  } catch (error) {
    return sendError(res, 500, 'Failed to fetch drivers', error);
  }
};

/**
 * @route   GET /api/drivers/:id
 * @desc    Get single driver by ID
 * @access  Public
 */
const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return sendError(res, 404, 'Driver not found');
    }
    
    // Append the computed helper flag
    const driverData = {
      ...driver.toObject(),
      isExpired: isLicenseExpired(driver.licenseExpiryDate)
    };
    
    return sendSuccess(res, 200, 'Driver retrieved successfully', driverData);
  } catch (error) {
    if (error.name === 'CastError') {
      return sendError(res, 400, 'Invalid driver ID format');
    }
    return sendError(res, 500, 'Failed to fetch driver', error);
  }
};

/**
 * @route   POST /api/drivers
 * @desc    Create a new driver
 * @access  Public
 */
const createDriver = async (req, res) => {
  try {
    const newDriver = new Driver(req.body);

    if(isLicenseExpired(req.body.licenseExpiryDate)){
        return sendError(
            res,
            400,
            "Driver license is already expired"
        );
    }

    const savedDriver = await newDriver.save();
    
    return sendSuccess(res, 201, 'Driver created successfully', savedDriver);
  } catch (error) {
    if (error.code === 11000) {
      return sendError(res, 409, 'License number must be unique');
    }
    
    if (error.name === 'ValidationError') {
      return sendError(res, 400, 'Validation failed', error);
    }
    
    return sendError(res, 500, 'Failed to create driver', error);
  }
};

/**
 * @route   PUT /api/drivers/:id
 * @desc    Update a driver
 * @access  Public
 */
const updateDriver = async (req, res) => {
  try {


    if(req.body.status){
        return sendError(
            res,
            400,
            "Driver status is managed automatically by trips"
        );
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedDriver) {
      return sendError(res, 404, 'Driver not found');
    }

    return sendSuccess(res, 200, 'Driver updated successfully', updatedDriver);
  } catch (error) {
    if (error.code === 11000) {
      return sendError(res, 409, 'License number must be unique');
    }
    
    if (error.name === 'ValidationError') {
      return sendError(res, 400, 'Validation failed', error);
    }
    
    if (error.name === 'CastError') {
      return sendError(res, 400, 'Invalid driver ID format');
    }

    return sendError(res, 500, 'Failed to update driver', error);
  }
};

/**
 * @route   DELETE /api/drivers/:id
 * @desc    Delete a driver
 * @access  Public
 */
const deleteDriver = async (req, res) => {
  try {

    const driver = await Driver.findById(req.params.id);

    if (!driver) {
        return sendError(res, 404, "Driver not found");
    }

    if(driver.status==="On Trip"){
        return sendError(
            res,
            400,
            "Cannot delete a driver currently assigned to a trip"
        );
    }
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    
    if (!deletedDriver) {
      return sendError(res, 404, 'Driver not found');
    }
    
    return sendSuccess(res, 200, 'Driver deleted successfully', deletedDriver);
  } catch (error) {
    if (error.name === 'CastError') {
      return sendError(res, 400, 'Invalid driver ID format');
    }
    return sendError(res, 500, 'Failed to delete driver', error);
  }
};

export {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
};