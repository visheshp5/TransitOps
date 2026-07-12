import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [role, setRole] = useState("Fleet Manager");

  const handleLogin = () => {
    login(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-8">
          TransitOps Login
        </h1>

        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full border p-3 rounded-lg mb-6"
          placeholder="Password"
        />

        <select
          className="w-full border p-3 rounded-lg mb-6"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Fleet Manager</option>
          <option>Driver</option>
          <option>Safety Officer</option>
          <option>Financial Analyst</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

      </div>

    </div>
  );
};

export default Login;