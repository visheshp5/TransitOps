const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>

          <h2 className="text-4xl font-bold text-gray-800 mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;