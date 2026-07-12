import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTruck,
  FaUsers,
  FaRoute,
  FaTools,
  FaChartBar,
  FaTruckMoving,
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
    <aside
      className="w-64 min-h-screen flex flex-col shadow-lg"
      style={{
        background: "var(--sidebar)",
        color: "var(--text)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}

      <div
        className="h-24 flex flex-col justify-center items-center"
        style={{
          borderBottom: "1px solid var(--border)",
        }}
      >
        <FaTruckMoving
          size={40}
          style={{
            color: "#2563eb",
          }}
        />

        <h1
          className="text-3xl font-bold mt-2"
          style={{
            color: "var(--text)",
          }}
        >
          TransitOps
        </h1>
      </div>

      {/* User */}

      <div
        className="p-5"
        style={{
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            {role
              ?.split(" ")
              .map((word) => word[0])
              .join("")}
          </div>

          <div>
            <p
              className="text-sm"
              style={{
                color: "var(--text2)",
              }}
            >
              Logged in as
            </p>

            <p
              className="font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">
        {menu
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : ""
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {}
                  : {
                      color: "var(--text)",
                    }
              }
            >
              <span className="text-xl">{item.icon}</span>

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          ))}
      </nav>

      {/* Footer */}

      <div
        className="p-4 text-center"
        style={{
          borderTop: "1px solid var(--border)",
        }}
      >
        <p
          className="text-xs"
          style={{
            color: "var(--text2)",
          }}
        >
          TransitOps v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;