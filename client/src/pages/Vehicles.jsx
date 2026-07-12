import { useState } from "react";
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

const columns = [
  "Registration",
  "Model",
  "Type",
  "Capacity",
  "Odometer",
  "Cost",
  "Status",
  "Actions",
];

const Vehicles = () => {
  const [search, setSearch] = useState("");

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.registration
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.model
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.type
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.status
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <PageHeader
        title="Vehicle Registry"
        buttonText="+ Add Vehicle"
      />

      <div className="mb-6">
        <SearchBar
          placeholder="Search Vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left px-6 py-4 font-semibold text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.registration}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {vehicle.registration}
                  </td>

                  <td>{vehicle.model}</td>

                  <td>{vehicle.type}</td>

                  <td>{vehicle.capacity}</td>

                  <td>{vehicle.odometer}</td>

                  <td>{vehicle.cost}</td>

                  <td>
                    <StatusBadge
                      status={vehicle.status}
                    />
                  </td>

                  <td>
                    <div className="flex gap-4">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Vehicle"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete Vehicle"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-500"
                >
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Vehicles;