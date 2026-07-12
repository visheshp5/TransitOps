const colors = {
  Available: "#16a34a",
  "On Trip": "#2563eb",
  "In Shop": "#ea580c",
  Retired: "#dc2626",

  Suspended: "#dc2626",
  "Off Duty": "#64748b",

  Draft: "#64748b",
  Pending: "#ca8a04",
  Dispatched: "#2563eb",
  Completed: "#16a34a",
  Cancelled: "#dc2626",

  Active: "#ea580c",
  Closed: "#16a34a",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-semibold"
      style={{
        background: `${colors[status]}20`,
        color: colors[status] || "#64748b",
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;