import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";

import { FaEdit, FaTrash } from "react-icons/fa";

const vehicles = [
  {
    registration: "DL01AB1234",
    model: "Tata Ace",
    type: "Mini Truck",
    capacity: "800 kg",
    odometer: "45,210 km",
    cost: "₹7,50,000",
    status: "Available",
  },
  {
    registration: "MH12XY7788",
    model: "Mahindra Bolero",
    type: "Pickup",
    capacity: "1200 kg",
    odometer: "80,100 km",
    cost: "₹9,20,000",
    status: "On Trip",
  },
  {
    registration: "RJ14CD4589",
    model: "Ashok Leyland",
    type: "Truck",
    capacity: "5000 kg",
    odometer: "1,20,000 km",
    cost: "₹18,00,000",
    status: "In Shop",
  },
];

const Vehicles = () => {
  return (
    <Layout>
      <PageHeader
        title="Vehicle Registry"
        buttonText="+ Add Vehicle"
      />

      <div className="mb-6">
        <SearchBar placeholder="Search Vehicle..." />
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

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Registration
              </th>

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Model
              </th>

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Type
              </th>

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Capacity
              </th>

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Odometer
              </th>

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Cost
              </th>

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Status
              </th>

              <th className="p-4 text-left" style={{ color: "var(--text)" }}>
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.registration}
                style={{
                  borderTop: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                <td className="p-4">{vehicle.registration}</td>

                <td className="p-4">{vehicle.model}</td>

                <td className="p-4">{vehicle.type}</td>

                <td className="p-4">{vehicle.capacity}</td>

                <td className="p-4">{vehicle.odometer}</td>

                <td className="p-4">{vehicle.cost}</td>

                <td className="p-4">
                  <StatusBadge status={vehicle.status} />
                </td>

                <td className="p-4">
                  <div className="flex gap-4">

                    <button className="text-blue-600 hover:scale-110 transition">
                      <FaEdit />
                    </button>

                    <button className="text-red-600 hover:scale-110 transition">
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

export default Vehicles;