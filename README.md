# 🚚 TransitOps Backend

A RESTful backend API for **TransitOps**, a fleet and transportation management system. It provides secure management of vehicles, drivers, trips, fuel logs, expenses, maintenance records, authentication, and analytics.

---

## 📌 Features

### Authentication & Authorization
- JWT-based Authentication
- Role-based Access Control (Admin, Fleet Manager, Driver)
- Protected API Routes
- Password Hashing using bcrypt

### Vehicle Management
- Create, Read, Update, Delete vehicles
- Vehicle search & filtering
- Registration number validation
- Prevent deletion of vehicles currently on trip or under maintenance
- Automatic status management

### Driver Management
- Create, Read, Update, Delete drivers
- Driver search & filtering
- License expiry detection
- Duplicate license prevention
- Prevent deletion of drivers assigned to active trips

### Trip Management
- Create and assign trips
- Assign drivers and vehicles
- Trip status tracking
- Automatic vehicle/driver status updates

### Fuel Management
- Record fuel logs
- Track fuel expenses
- Vehicle-wise fuel history

### Expense Management
- Add operational expenses
- Expense categorization
- Vehicle and trip based expense tracking

### Maintenance
- Schedule maintenance
- Track maintenance history
- Maintenance status management

### Dashboard & Analytics
- Fleet statistics
- Expense summaries
- Fuel consumption reports
- Trip analytics

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator
- bcrypt
- CORS
- dotenv

---

# 📂 Project Structure

```
server/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── validators/
├── utils/
├── config/
├── server.js
├── package.json
└── .env
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/visheshp5/TransitOps
```

Move inside server

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d
```

Start the server

```bash
npm run dev
```

or

```bash
npm start
```

---

# 📡 API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

---

## Vehicles

```
GET    /api/vehicles
GET    /api/vehicles/:id
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id
```

Supports filtering

```
GET /api/vehicles?status=Available
GET /api/vehicles?region=North
GET /api/vehicles?type=Truck
GET /api/vehicles?registrationNumber=UP80AB1234
```

---

## Drivers

```
GET    /api/drivers
GET    /api/drivers/:id
POST   /api/drivers
PUT    /api/drivers/:id
DELETE /api/drivers/:id
```

Supports filtering

```
GET /api/drivers?status=Available
GET /api/drivers?name=John
GET /api/drivers?licenseExpired=true
GET /api/drivers?licenseNumber=DL12345
```

---

## Trips

```
GET
POST
PUT
DELETE
```

Trip endpoints include assignment of drivers and vehicles.

---

## Fuel Logs

```
GET
POST
```

Supports

- vehicle filter
- trip filter
- date range

---

## Expenses

```
GET
POST
```

Supports

- vehicle filter
- trip filter
- expense type
- date range

---

## Maintenance

```
GET
POST
PUT
DELETE
```

---

## Dashboard

```
GET /api/analytics/dashboard
```

Provides

- Total Vehicles
- Active Trips
- Total Drivers
- Maintenance Count
- Fuel Summary
- Expense Summary

---

# 🔒 Authorization

Role-based authorization is implemented.

| Role | Permissions |
|-------|-------------|
| Admin | Full Access |
| Fleet Manager | Vehicle, Driver, Trip, Fuel, Expense Management |
| Driver | View Assigned Trips |

---

# ✅ Validations

### Vehicles

- Unique Registration Number
- Registration format validation
- Positive Load Capacity
- Non-negative Odometer
- Duplicate prevention

### Drivers

- Unique License Number
- License expiry tracking
- Safety score (0–100)
- Status validation

---

# 🧪 Testing

Test APIs using

- Postman
- Thunder Client
- Insomnia

Authentication endpoints return a JWT token which must be sent as

```
Authorization: Bearer <token>
```

---

# 👨‍💻 Contributors

- Member 1 – Authentication & Authorization
- Member 2 – Vehicle & Driver Management
- Member 3 – Trips, Fuel Logs, Expenses & Dashboard

---

# Future Improvements

- Swagger/OpenAPI Documentation
- Unit & Integration Testing
- Docker Support
- CI/CD Pipeline
- Email Notifications
- File Upload Support
- Real-time Tracking

---

# License

This project is developed for educational and academic purposes.
