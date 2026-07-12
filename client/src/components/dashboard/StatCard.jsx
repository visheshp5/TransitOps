const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="rounded-2xl p-6 border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{
        background: "var(--card)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm uppercase tracking-wider font-semibold"
            style={{
              color: "var(--text2)",
            }}
          >
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;