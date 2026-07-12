const trips = [
  {
    id: 1,
    route: "Delhi → Jaipur",
    driver: "Alex",
    vehicle: "Van-05",
    status: "Completed",
  },
  {
    id: 2,
    route: "Mumbai → Pune",
    driver: "John",
    vehicle: "Truck-12",
    status: "On Trip",
  },
  {
    id: 3,
    route: "Chennai → Bangalore",
    driver: "David",
    vehicle: "Mini Van",
    status: "Pending",
  },
];

const badge = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";

    case "On Trip":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const RecentTrips = () => {
  return (
    <div
      className="rounded-2xl border shadow-md mt-8 overflow-hidden"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="p-6 border-b"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-2xl font-bold"
          style={{
            color: "var(--text)",
          }}
        >
          Recent Trips
        </h2>
      </div>

      <table className="w-full">
        <thead
          style={{
            background: "var(--bg)",
          }}
        >
          <tr>
            <th
              className="text-left p-4"
              style={{ color: "var(--text)" }}
            >
              Route
            </th>

            <th
              className="text-left p-4"
              style={{ color: "var(--text)" }}
            >
              Driver
            </th>

            <th
              className="text-left p-4"
              style={{ color: "var(--text)" }}
            >
              Vehicle
            </th>

            <th
              className="text-left p-4"
              style={{ color: "var(--text)" }}
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr
              key={trip.id}
              className="hover:bg-gray-100"
              style={{
                borderBottom: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              <td className="p-4">{trip.route}</td>

              <td className="p-4">{trip.driver}</td>

              <td className="p-4">{trip.vehicle}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${badge(
                    trip.status
                  )}`}
                >
                  {trip.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTrips;