import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTruck,
  FaUsers,
  FaRoute,
  FaTools,
  FaChartBar,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Vehicles", path: "/vehicles", icon: <FaTruck /> },
  { name: "Drivers", path: "/drivers", icon: <FaUsers /> },
  { name: "Trips", path: "/trips", icon: <FaRoute /> },
  { name: "Maintenance", path: "/maintenance", icon: <FaTools /> },
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen shadow-xl">

      <div className="h-20 flex items-center justify-center border-b border-slate-700">

        <h1 className="text-3xl font-bold tracking-wide">
          TransitOps
        </h1>

      </div>

      <nav className="mt-6">

        {menu.map((item) => (
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