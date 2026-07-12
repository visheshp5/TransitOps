import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
// Uncomment only if VehicleContext exists and is working
// import { VehicleProvider } from "./context/VehicleContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <VehicleProvider> */}
        <App />
      {/* </VehicleProvider> */}
    </AuthProvider>
  </React.StrictMode>
);