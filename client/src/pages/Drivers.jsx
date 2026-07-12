import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";
import { FaEdit, FaTrash } from "react-icons/fa";

const drivers = [
  {
    id: 1,
    name: "Alex Johnson",
    license: "DL123456789",
    category: "Heavy Motor Vehicle",
    expiry: "15-08-2028",
    contact: "9876543210",
    safety: "95",
    status: "Available",
  },
  {
    id: 2,
    name: "John Smith",
    license: "DL987654321",
    category: "Light Motor Vehicle",
    expiry: "10-01-2027",
    contact: "9123456780",
    safety: "88",
    status: "On Trip",
  },
  {
    id: 3,
    name: "David Lee",
    license: "DL456123789",
    category: "Heavy Motor Vehicle",
    expiry: "05-05-2026",
    contact: "9988776655",
    safety: "76",
    status: "Suspended",
  },
];

const columns = [
  "Name",
  "License No.",
  "Category",
  "Expiry",
  "Contact",
  "Safety Score",
  "Status",
  "Actions",
];

const Drivers = () => {
  return (
    <Layout>
      <PageHeader
        title="Driver Management"
        buttonText="+ Add Driver"
      />

      <div className="mb-6">
        <SearchBar placeholder="Search Driver..." />
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

            {drivers.map((driver) => (

              <tr
                key={driver.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{driver.name}</td>

                <td>{driver.license}</td>

                <td>{driver.category}</td>

                <td>{driver.expiry}</td>

                <td>{driver.contact}</td>

                <td>
                  <span className="font-semibold">
                    {driver.safety}%
                  </span>
                </td>

                <td>
                  <StatusBadge status={driver.status} />
                </td>

                <td>
                  <div className="flex gap-4">

                    <button
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800"
                    >
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

export default Drivers;