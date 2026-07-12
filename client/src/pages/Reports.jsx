import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import FleetChart from "../components/dashboard/FleetChart";

import {
  FaGasPump,
  FaChartLine,
  FaRupeeSign,
  FaTruck,
  FaDownload,
} from "react-icons/fa";

const Reports = () => {
  const exportCSV = () => {
    const rows = [
      ["Vehicle", "Trips", "Fuel Used", "Maintenance", "ROI"],
      ["Tata Ace", "34", "620 L", "₹25,000", "22%"],
      ["Mahindra Bolero", "27", "510 L", "₹18,500", "18%"],
      ["Ashok Leyland", "18", "1250 L", "₹60,000", "9%"],
    ];

    const csvContent = rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "TransitOps_Report.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <PageHeader title="Reports & Analytics" buttonText="" />

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          <FaDownload />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Fleet Utilization"
          value="82%"
          icon={<FaTruck />}
          color="bg-blue-600"
        />

        <StatCard
          title="Fuel Efficiency"
          value="14.5 km/L"
          icon={<FaGasPump />}
          color="bg-green-600"
        />

        <StatCard
          title="Operational Cost"
          value="₹4.25L"
          icon={<FaRupeeSign />}
          color="bg-red-500"
        />

        <StatCard
          title="Vehicle ROI"
          value="18%"
          icon={<FaChartLine />}
          color="bg-purple-600"
        />
      </div>

      <FleetChart />

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">
          Vehicle Performance
        </h2>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Vehicle</th>
              <th className="text-left">Trips</th>
              <th className="text-left">Fuel Used</th>
              <th className="text-left">Maintenance</th>
              <th className="text-left">ROI</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-4">Tata Ace</td>
              <td>34</td>
              <td>620 L</td>
              <td>₹25,000</td>
              <td className="text-green-600 font-semibold">
                22%
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-4">
                Mahindra Bolero
              </td>
              <td>27</td>
              <td>510 L</td>
              <td>₹18,500</td>
              <td className="text-green-600 font-semibold">
                18%
              </td>
            </tr>

            <tr>
              <td className="p-4">
                Ashok Leyland
              </td>
              <td>18</td>
              <td>1250 L</td>
              <td>₹60,000</td>
              <td className="text-red-600 font-semibold">
                9%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Reports;