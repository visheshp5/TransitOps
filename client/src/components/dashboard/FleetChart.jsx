import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useTheme } from "../../context/ThemeContext";

const data = [
  { month: "Jan", trips: 12 },
  { month: "Feb", trips: 18 },
  { month: "Mar", trips: 22 },
  { month: "Apr", trips: 15 },
  { month: "May", trips: 30 },
  { month: "Jun", trips: 26 },
];

const FleetChart = () => {
  const { dark } = useTheme();

  return (
    <div
      className="rounded-2xl border shadow-md mt-8 p-6"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <h2
        className="text-2xl font-bold mb-6"
        style={{
          color: "var(--text)",
        }}
      >
        Fleet Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid
            stroke={dark ? "#475569" : "#e5e7eb"}
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            tick={{
              fill: dark ? "#f8fafc" : "#374151",
            }}
            axisLine={{
              stroke: dark ? "#64748b" : "#d1d5db",
            }}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: dark ? "#f8fafc" : "#374151",
            }}
            axisLine={{
              stroke: dark ? "#64748b" : "#d1d5db",
            }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: dark ? "#1e293b" : "#ffffff",
              border: dark
                ? "1px solid #475569"
                : "1px solid #e5e7eb",
              color: dark ? "#ffffff" : "#111827",
              borderRadius: "10px",
            }}
          />

          <Bar
            dataKey="trips"
            fill="#2563eb"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FleetChart;