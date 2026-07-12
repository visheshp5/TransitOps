import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTruck,
  FaUsers,
  FaRoute,
  FaTools,
  FaChartBar,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { role } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
      roles: [
        "Fleet Manager",
        "Driver",
        "Safety Officer",
        "Financial Analyst",
      ],
    },

    {
      name: "Vehicles",
      path: "/vehicles",
      icon: <FaTruck />,
      roles: ["Fleet Manager"],
    },

    {
      name: "Drivers",
      path: "/drivers",
      icon: <FaUsers />,
      roles: ["Fleet Manager", "Safety Officer"],
    },

    {
      name: "Trips",
      path: "/trips",
      icon: <FaRoute />,
      roles: ["Fleet Manager", "Driver"],
    },

    {
      name: "Maintenance",
      path: "/maintenance",
      icon: <FaTools />,
      roles: ["Fleet Manager"],
    },

    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
      roles: ["Fleet Manager", "Financial Analyst"],
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen shadow-xl">
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-3xl font-bold tracking-wide">
          TransitOps
        </h1>
      </div>

      {/* Logged-in Role */}
      <div className="px-6 py-4 border-b border-slate-700">
        <p className="text-sm text-gray-400">Logged in as</p>
        <p className="font-semibold text-white">{role}</p>
      </div>

      <nav className="mt-4">
        {menu
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 border-r-4 border-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>

              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;