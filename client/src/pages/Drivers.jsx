import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";

import { FaEdit, FaTrash } from "react-icons/fa";

const drivers = [
  {
    id: 1,
    name: "Alex Johnson",
    license: "DL123456",
    category: "LMV",
    expiry: "15 Aug 2027",
    contact: "9876543210",
    safety: "92",
    status: "Available",
  },
  {
    id: 2,
    name: "John Smith",
    license: "DL654321",
    category: "HMV",
    expiry: "10 Dec 2026",
    contact: "9876501234",
    safety: "88",
    status: "On Trip",
  },
  {
    id: 3,
    name: "David Lee",
    license: "DL987654",
    category: "LMV",
    expiry: "25 Mar 2025",
    contact: "9988776655",
    safety: "75",
    status: "Suspended",
  },
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

              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">License</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Expiry</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Safety</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>

            </tr>
          </thead>

          <tbody>

            {drivers.map((driver) => (

              <tr
                key={driver.id}
                style={{
                  color: "var(--text)",
                  borderTop: "1px solid var(--border)",
                }}
              >

                <td className="p-4">{driver.name}</td>
                <td className="p-4">{driver.license}</td>
                <td className="p-4">{driver.category}</td>
                <td className="p-4">{driver.expiry}</td>
                <td className="p-4">{driver.contact}</td>
                <td className="p-4">{driver.safety}</td>

                <td className="p-4">
                  <StatusBadge status={driver.status} />
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

export default Drivers;