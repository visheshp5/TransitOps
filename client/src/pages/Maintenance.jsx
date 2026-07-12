import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";

import {
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const maintenance = [
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
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Registration</th>
              <th className="p-4 text-left">Maintenance</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Cost</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {maintenance.map((item) => (
              <tr
                key={item.id}
                style={{
                  color: "var(--text)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <td className="p-4">{item.vehicle}</td>
                <td className="p-4">{item.registration}</td>
                <td className="p-4">{item.type}</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.cost}</td>

                <td className="p-4">
                  <StatusBadge status={item.status} />
                </td>

                <td className="p-4">
                  <div className="flex gap-4">

                    <button className="text-green-600">
                      <FaCheckCircle />
                    </button>

                    <button className="text-blue-600">
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

export default Maintenance;