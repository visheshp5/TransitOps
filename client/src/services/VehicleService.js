import api from "./api";

export const getVehicles = () => api.get("/vehicles");

export const addVehicle = (vehicle) =>
  api.post("/vehicles", vehicle);

export const updateVehicle = (id, vehicle) =>
  api.put(`/vehicles/${id}`, vehicle);

export const deleteVehicle = (id) =>
  api.delete(`/vehicles/${id}`);