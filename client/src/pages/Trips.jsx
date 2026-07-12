import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";

import {
  FaPlay,
  FaCheck,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const trips = [
  {
    id: 1,
    source: "Delhi",
    destination: "Jaipur",
    vehicle: "Tata Ace",
    driver: "Alex Johnson",
    cargo: "450 kg",
    distance: "280 km",
    status: "Pending",
  },
  {
    id: 2,
    source: "Mumbai",
    destination: "Pune",
    vehicle: "Bolero Pickup",
    driver: "John Smith",
    cargo: "900 kg",
    distance: "160 km",
    status: "On Trip",
  },
  {
    id: 3,
    source: "Chennai",
    destination: "Bangalore",
    vehicle: "Ashok Leyland",
    driver: "David Lee",
    cargo: "3000 kg",
    distance: "350 km",
    status: "Completed",
  },
];

const Trips = () => {
  return (
    <Layout>
      <PageHeader
        title="Trip Management"
        buttonText="+ Create Trip"
      />

      <div className="mb-6">
        <SearchBar placeholder="Search Trip..." />
      </div>

      <div
        className="rounded-2xl border shadow-md overflow-hidden"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <table className="w-full">
          <thead
            style={{
              background: "var(--bg)",
            }}
          >
            <tr>
              <th className="p-4 text-left">Source</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Cargo</th>
              <th className="p-4 text-left">Distance</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                style={{
                  color: "var(--text)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <td className="p-4">{trip.source}</td>
                <td className="p-4">{trip.destination}</td>
                <td className="p-4">{trip.vehicle}</td>
                <td className="p-4">{trip.driver}</td>
                <td className="p-4">{trip.cargo}</td>
                <td className="p-4">{trip.distance}</td>

                <td className="p-4">
                  <StatusBadge status={trip.status} />
                </td>

                <td className="p-4">
                  <div className="flex gap-4">

                    <button className="text-green-600">
                      <FaPlay />
                    </button>

                    <button className="text-blue-600">
                      <FaCheck />
                    </button>

                    <button className="text-yellow-600">
                      <FaEdit />
                    </button>

                    <button className="text-red-600">
                      <FaTrash />
                    </button>

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