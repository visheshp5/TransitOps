import { v4 as uuid } from "uuid";

const vehicles = [
  {
    id: uuid(),
    registration: "DL01AB1234",
    model: "Tata Ace",
    type: "Mini Truck",
    capacity: 800,
    odometer: 45210,
    cost: 750000,
    status: "Available",
  },
  {
    id: uuid(),
    registration: "MH12XY7788",
    model: "Mahindra Bolero",
    type: "Pickup",
    capacity: 1200,
    odometer: 80100,
    cost: 920000,
    status: "On Trip",
  },
];

export default vehicles;