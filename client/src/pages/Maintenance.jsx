import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const maintenanceLogs = [
  {
    id: 1,
    vehicle: "Tata Ace",
    registration: "DL01AB1234",
    type: "Oil Change",
    date: "12 Jul 2026",
    cost: "₹2,500",
    status: "Active",
  },
  {
    id: 2,
    vehicle: "Mahindra Bolero",
    registration: "MH12XY7788",
    type: "Brake Service",
    date: "08 Jul 2026",
    cost: "₹8,200",
    status: "Closed",
  },
  {
    id: 3,
    vehicle: "Ashok Leyland",
    registration: "RJ14CD4589",
    type: "Engine Inspection",
    date: "05 Jul 2026",
    cost: "₹15,000",
    status: "Active",
  },
];

const columns = [
  "Vehicle",
  "Registration",
  "Maintenance",
  "Date",
  "Cost",
  "Status",
  "Actions",
];

const Maintenance = () => {
  return (
    <Layout>
      <PageHeader
        title="Maintenance Management"
        buttonText="+ Add Maintenance"
      />

      <div className="mb-6">
        <SearchBar placeholder="Search Maintenance..." />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left px-6 py-4 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {maintenanceLogs.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{item.vehicle}</td>
                <td>{item.registration}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>{item.cost}</td>

                <td>
                  <StatusBadge status={item.status} />
                </td>

                <td>
                  <div className="flex gap-3">

                    <button
                      className="text-green-600 hover:text-green-800"
                      title="Close Maintenance"
                    >
                      <FaCheckCircle />
                    </button>

                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
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

export default Maintenance;