import {
  FaBell,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { role, logout } = useAuth();
  const { dark, setDark } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="h-20 border-b flex items-center justify-between px-8"
      style={{
        background: "var(--navbar)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold">
          TransitOps
        </h1>

        <p
          className="text-sm"
          style={{
            color: "var(--text2)",
          }}
        >
          Smart Transport Operations Platform
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Theme Toggle */}

        <button
          onClick={() => setDark(!dark)}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}

        <button
          className="relative w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          <FaBell />

          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center"
            style={{
              background: "#ef4444",
              color: "#fff",
            }}
          >
            3
          </span>
        </button>

        {/* User */}

        <div className="text-right">

          <p className="font-semibold">
            {role}
          </p>

          <p
            className="text-xs"
            style={{
              color: "var(--text2)",
            }}
          >
            Logged In
          </p>

        </div>

        {/* Avatar */}

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

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 rounded-lg"
          style={{
            background: "#dc2626",
            color: "#fff",
          }}
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>
    </header>
  );
};

export default Navbar;