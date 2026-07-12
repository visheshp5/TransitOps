import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";
import FleetChart from "../components/dashboard/FleetChart";
import RecentTrips from "../components/dashboard/RecentTrips";

import {
  FaTruck,
  FaUsers,
  FaRoute,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Active Vehicles"
          value="24"
          icon={<FaTruck />}
          color="bg-blue-600"
        />

        <StatCard
          title="Drivers On Duty"
          value="15"
          icon={<FaUsers />}
          color="bg-green-600"
        />

        <StatCard
          title="Active Trips"
          value="8"
          icon={<FaRoute />}
          color="bg-yellow-500"
        />

        <StatCard
          title="Fleet Utilization"
          value="82%"
          icon={<FaChartLine />}
          color="bg-red-500"
        />

      </div>

      <FleetChart />

      <RecentTrips />

    </Layout>
  );
};

export default Dashboard;