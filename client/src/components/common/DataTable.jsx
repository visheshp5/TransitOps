const DataTable = ({ columns, data }) => {
  return (
    <div
      className="rounded-2xl border shadow-md overflow-hidden"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead
            style={{
              background: "var(--bg)",
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left p-4 font-semibold"
                  style={{
                    color: "var(--text)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                style={{
                  color: "var(--text)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {Object.values(row).map((value, i) => (
                  <td
                    key={i}
                    className="p-4"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default DataTable;