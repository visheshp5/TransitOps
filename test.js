import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from './server.js';
import http from 'http';

const PORT = 5555;
const BASE_URL = `http://localhost:${PORT}/api`;

const runTests = async () => {
  console.log('Starting MongoDB Memory Server...');
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
  console.log('Connected to In-Memory DB');

  const server = http.createServer(app);
  server.listen(PORT);
  console.log(`Test server running on port ${PORT}`);

  try {
    let vehicleId;
    let driverId;

    // ============================================
    // VEHICLE TESTS
    // ============================================
    console.log('\n--- TESTING VEHICLES ---');

    // 1. Create Vehicle
    const createV = await fetch(`${BASE_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registrationNumber: 'TEST-01',
        vehicleName: 'Test Van',
        model: 'Transit',
        type: 'Van',
        maxLoadCapacity: 1000,
        acquisitionCost: 20000,
        region: 'North'
      })
    });
    const createVRes = await createV.json();
    if (!createVRes.success) throw new Error(`Vehicle creation failed: ${JSON.stringify(createVRes)}`);
    console.log('✓ Vehicle creation');
    vehicleId = createVRes.data._id;

    // 2. Duplicate Registration Validation
    const duplicateV = await fetch(`${BASE_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registrationNumber: 'TEST-01',
        vehicleName: 'Another Van',
        model: 'Transit',
        type: 'Van',
        maxLoadCapacity: 1000,
        acquisitionCost: 20000,
        region: 'South'
      })
    });
    if (duplicateV.status === 409) console.log('✓ Duplicate registration number validation');
    else throw new Error('Duplicate registration should return 409');

    // 3. Invalid Status Validation
    const invalidV = await fetch(`${BASE_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registrationNumber: 'TEST-02',
        vehicleName: 'Test Truck',
        model: 'Volvo',
        type: 'Truck',
        maxLoadCapacity: 5000,
        acquisitionCost: 50000,
        region: 'East',
        status: 'Flying' // Invalid
      })
    });
    if (invalidV.status === 400) console.log('✓ Invalid status values (Vehicle)');
    else throw new Error('Invalid status should return 400 validation error');

    // 4. Update Vehicle
    const updateV = await fetch(`${BASE_URL}/vehicles/${vehicleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'On Trip' })
    });
    const updateVRes = await updateV.json();
    if (!updateVRes.success || updateVRes.data.status !== 'On Trip') throw new Error('Vehicle update failed');
    console.log('✓ Vehicle update');

    // 5. Search/Filter Vehicles
    const searchV = await fetch(`${BASE_URL}/vehicles?status=On Trip`);
    const searchVRes = await searchV.json();
    if (!searchVRes.success || searchVRes.data.length !== 1) throw new Error('Vehicle search/filter failed');
    console.log('✓ Vehicle search and filtering');

    // 6. Delete Vehicle
    const deleteV = await fetch(`${BASE_URL}/vehicles/${vehicleId}`, { method: 'DELETE' });
    const deleteVRes = await deleteV.json();
    if (!deleteVRes.success) throw new Error('Vehicle deletion failed');
    console.log('✓ Vehicle deletion');

    // ============================================
    // DRIVER TESTS
    // ============================================
    console.log('\n--- TESTING DRIVERS ---');

    // 1. Create Driver (Expired License)
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    
    const createD = await fetch(`${BASE_URL}/drivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        licenseNumber: 'DL-12345',
        licenseCategory: 'Heavy',
        licenseExpiryDate: pastDate.toISOString(),
        contactNumber: '555-1234'
      })
    });
    const createDRes = await createD.json();
    if (!createDRes.success) throw new Error(`Driver creation failed: ${JSON.stringify(createDRes)}`);
    console.log('✓ Driver creation');
    driverId = createDRes.data._id;

    // 2. Duplicate License Validation
    const duplicateD = await fetch(`${BASE_URL}/drivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        licenseNumber: 'DL-12345',
        licenseCategory: 'Light',
        licenseExpiryDate: new Date().toISOString(),
        contactNumber: '555-5678'
      })
    });
    if (duplicateD.status === 409) console.log('✓ Duplicate license number validation');
    else throw new Error('Duplicate license should return 409');

    // 3. Update Driver
    const updateD = await fetch(`${BASE_URL}/drivers/${driverId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Off Duty' })
    });
    const updateDRes = await updateD.json();
    if (!updateDRes.success || updateDRes.data.status !== 'Off Duty') throw new Error('Driver update failed');
    console.log('✓ Driver update');

    // 4. Search/Filter Drivers (Expired License check)
    const searchD = await fetch(`${BASE_URL}/drivers?licenseExpired=true`);
    const searchDRes = await searchD.json();
    if (!searchDRes.success || searchDRes.data.length !== 1) throw new Error('Driver filter licenseExpired failed');
    console.log('✓ Driver search and filtering');
    console.log('✓ Expired license helper query logic');

    // 5. Delete Driver
    const deleteD = await fetch(`${BASE_URL}/drivers/${driverId}`, { method: 'DELETE' });
    const deleteDRes = await deleteD.json();
    if (!deleteDRes.success) throw new Error('Driver deletion failed');
    console.log('✓ Driver deletion');

    console.log('\n✅ ALL TESTS PASSED SUCCESSFULLY');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
  } finally {
    // Cleanup
    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
    process.exit(0);
  }
};

runTests();
