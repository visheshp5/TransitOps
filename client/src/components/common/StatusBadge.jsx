const colors = {
  // Vehicle Status
  Available: "bg-green-100 text-green-700",
  "On Trip": "bg-blue-100 text-blue-700",
  "In Shop": "bg-orange-100 text-orange-700",
  Retired: "bg-red-100 text-red-700",

  // Driver Status
  Suspended: "bg-red-100 text-red-700",
  "Off Duty": "bg-gray-100 text-gray-700",

  // Trip Status
  Draft: "bg-gray-100 text-gray-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Dispatched: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",

  // Maintenance Status
  Active: "bg-orange-100 text-orange-700",
  Closed: "bg-green-100 text-green-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;