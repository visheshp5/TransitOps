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
    <div className="bg-white rounded-2xl shadow-md mt-8 overflow-hidden">

      <div className="p-6 border-b">

        <h2 className="text-2xl font-bold">
          Recent Trips
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">Route</th>
            <th className="text-left">Driver</th>
            <th className="text-left">Vehicle</th>
            <th className="text-left">Status</th>

          </tr>

        </thead>

        <tbody>

          {trips.map((trip) => (
            <tr key={trip.id} className="border-b hover:bg-gray-50">

              <td className="p-4">{trip.route}</td>
              <td>{trip.driver}</td>
              <td>{trip.vehicle}</td>

              <td>

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