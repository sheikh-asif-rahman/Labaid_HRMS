import { Eye, Pencil, Trash2 } from "lucide-react";
import { employeeTableData } from "../../data/employee-table-data";

const EmployeeTable = ({ search }: { search: string }) => {

  const filteredData = employeeTableData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.id.toLowerCase().includes(search.toLowerCase()) ||
    emp.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">

          {/* HEADER */}
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="p-4 text-left text-sm text-zinc-600">Employee</th>
              <th className="p-4 text-left text-sm text-zinc-600">Designation</th>
              <th className="p-4 text-left text-sm text-zinc-600">Department</th>
              <th className="p-4 text-left text-sm text-zinc-600">Facility</th>
              <th className="p-4 text-left text-sm text-zinc-600">Status</th>
              <th className="p-4 text-right text-sm text-zinc-600">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center text-zinc-400">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredData.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-zinc-100 hover:bg-zinc-50 transition"
                >

                  {/* EMPLOYEE */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.image}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-zinc-800">
                          {emp.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {emp.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-zinc-700">{emp.designation}</td>
                  <td className="p-4 text-zinc-700">{emp.department}</td>
                  <td className="p-4 text-zinc-700">{emp.facility}</td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`
                        px-3 py-1 text-xs rounded-full font-medium
                        ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : emp.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }
                      `}
                    >
                      {emp.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex justify-end gap-2 text-zinc-500">
                      <button className="hover:text-cyan-600">
                        <Eye size={18} />
                      </button>
                      <button className="hover:text-blue-600">
                        <Pencil size={18} />
                      </button>
                      <button className="hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default EmployeeTable;