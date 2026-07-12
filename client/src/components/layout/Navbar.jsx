import { FaBell } from "react-icons/fa";

const Navbar = () => {
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

          <p className="font-semibold">
            Fleet Manager
          </p>

          <p className="text-gray-500 text-sm">
            Admin
          </p>

        </div>

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

          FM

        </div>

      </div>

    </header>
  );
};

export default Navbar;