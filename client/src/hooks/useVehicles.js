import { useState } from "react";
import vehicleData from "../data/vehicles";

const useVehicles = () => {
  const [vehicles, setVehicles] = useState(vehicleData);

  const addVehicle = (vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  const deleteVehicle = (id) => {
    setVehicles((prev) =>
      prev.filter((vehicle) => vehicle.id !== id)
    );
  };

  const editVehicle = (updatedVehicle) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === updatedVehicle.id
          ? updatedVehicle
          : vehicle
      )
    );
  };

  return {
    vehicles,
    addVehicle,
    deleteVehicle,
    editVehicle,
  };
};

export default useVehicles;