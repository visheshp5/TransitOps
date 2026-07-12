import { useState } from "react";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";
import {
  FaEdit,
  FaTrash,
  FaPlay,
  FaCheck,
} from "react-icons/fa";

const vehicles = [
  {
    name: "Tata Ace",
    capacity: 800,
    status: "Available",
  },
  {
    name: "Bolero Pickup",
    capacity: 1200,
    status: "On Trip",
  },
  {
    name: "Ashok Leyland",
    capacity: 5000,
    status: "In Shop",
  },
];

const drivers = [
  {
    name: "Alex Johnson",
    status: "Available",
    licenseExpired: false,
  },
  {
    name: "John Smith",
    status: "On Trip",
    licenseExpired: false,
  },
  {
    name: "David Lee",
    status: "Suspended",
    licenseExpired: true,
  },
];

const trips = [
  {
    id: 1,
    source: "Delhi",
    destination: "Jaipur",
    vehicle: "Tata Ace",
    driver: "Alex Johnson",
    cargo: 450,
    distance: 280,
    status: "Pending",
  },
];

const Trips = () => {
  const [cargoWeight, setCargoWeight] = useState("");

  const validateTrip = () => {
    const vehicle = vehicles[0];
    const driver = drivers[0];

    if (cargoWeight > vehicle.capacity) {
      alert("❌ Cargo exceeds vehicle capacity");
      return;
    }

    if (vehicle.status === "In Shop") {
      alert("❌ Vehicle is in maintenance");
      return;
    }

    if (vehicle.status === "On Trip") {
      alert("❌ Vehicle already assigned");
      return;
    }

    if (driver.status === "Suspended") {
      alert("❌ Driver is suspended");
      return;
    }

    if (driver.licenseExpired) {
      alert("❌ Driver license expired");
      return;
    }

    if (driver.status === "On Trip") {
      alert("❌ Driver already assigned");
      return;
    }

    alert("✅ Trip Validation Successful");
  };

  return (
    <Layout>
      <PageHeader
        title="Trip Management"
        buttonText="+ Create Trip"
      />

      <div className="mb-6">
        <SearchBar placeholder="Search Trip..." />
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-bold mb-5">
          Trip Validation Demo
        </h2>

        <input
          type="number"
          placeholder="Cargo Weight"
          value={cargoWeight}
          onChange={(e) =>
            setCargoWeight(Number(e.target.value))
          }
          className="border rounded-lg p-3 mr-4"
        />

        <button
          onClick={validateTrip}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Validate Trip
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Source</th>
              <th>Destination</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {trips.map((trip) => (
              <tr key={trip.id} className="border-b">

                <td className="p-4">{trip.source}</td>
                <td>{trip.destination}</td>
                <td>{trip.vehicle}</td>
                <td>{trip.driver}</td>
                <td>{trip.cargo} kg</td>

                <td>
                  <StatusBadge status={trip.status} />
                </td>

                <td>
                  <div className="flex gap-3">
                    <FaPlay />
                    <FaCheck />
                    <FaEdit />
                    <FaTrash />
                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
};

export default Trips;