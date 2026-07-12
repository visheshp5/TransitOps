import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-20 bg-white shadow-sm px-10 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Smart Transport Operations
        </h1>

        <p className="text-gray-500 text-sm">
          Fleet Management Dashboard
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative">
          <FaBell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
            3
          </span>
        </button>

        <div className="text-right">
          <p className="font-semibold">{role}</p>

          <p className="text-gray-500 text-sm">
            Logged In
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {role
            ?.split(" ")
            .map((word) => word[0])
            .join("")}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>
    </header>
  );
};

export default Navbar;