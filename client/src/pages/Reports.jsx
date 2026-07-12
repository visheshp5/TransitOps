import Layout from "../components/layout/Layout";
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
      ["Vehicle","Trips","Fuel Used","Maintenance","ROI"],
      ["Tata Ace","34","620 L","25000","22%"],
      ["Mahindra Bolero","27","510 L","18500","18%"],
      ["Ashok Leyland","18","1250 L","60000","9%"],
    ];

    const csv = rows.map(r=>r.join(",")).join("\n");

    const blob=new Blob([csv],{
      type:"text/csv"
    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");
    a.href=url;
    a.download="TransitOps_Report.csv";
    a.click();

    URL.revokeObjectURL(url);

  };

  return (

    <Layout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1
            className="text-4xl font-bold"
            style={{
              color:"var(--text)"
            }}
          >
            Reports & Analytics
          </h1>

          <p
            style={{
              color:"var(--text2)"
            }}
          >
            Fleet Performance Overview
          </p>

        </div>

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >
          <FaDownload/>

          Export CSV
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Fleet Utilization"
          value="82%"
          icon={<FaTruck/>}
          color="bg-blue-600"
        />

        <StatCard
          title="Fuel Efficiency"
          value="14.5 km/L"
          icon={<FaGasPump/>}
          color="bg-green-600"
        />

        <StatCard
          title="Operational Cost"
          value="₹4.25L"
          icon={<FaRupeeSign/>}
          color="bg-red-600"
        />

        <StatCard
          title="Vehicle ROI"
          value="18%"
          icon={<FaChartLine/>}
          color="bg-purple-600"
        />

      </div>

      <FleetChart/>

    </Layout>

  );

};

export default Reports;