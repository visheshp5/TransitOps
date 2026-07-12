import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import vehicleRoutes from './routes/vehicleRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import { fileURLToPath } from 'url';

config();
const __filename = fileURLToPath(import.meta.url);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/transitops';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'TransitOps Backend Modules API is running' });
});

// Database connection & Server start
if (process.argv[1] === __filename) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`Connected to MongoDB at ${MONGO_URI}`);
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    });
}

export default app;
