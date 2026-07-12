const DataTable = ({ columns, data }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-6 py-4"
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
              className="border-b hover:bg-gray-50"
            >
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  className="px-6 py-4"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default DataTable;