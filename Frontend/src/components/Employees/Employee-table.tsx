import { useState } from "react";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { employeeTableData } from "../../data/employee-table-data";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const EmployeeTable = ({ search }: { search: string }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const filteredData = employeeTableData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.id.toLowerCase().includes(search.toLowerCase()) ||
    emp.designation.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="rounded-2xl border bg-white overflow-hidden">

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-xs">

          <thead className="bg-zinc-50 border-b">
            <tr className="text-[11px] text-zinc-600">
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Facility</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-[12px]">
            {currentData.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-zinc-50">

                {/* Employee */}
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={emp.image}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="text-[12px] font-medium">{emp.name}</p>
                    <p className="text-[10px] text-zinc-500">{emp.id}</p>
                  </div>
                </td>

                <td className="p-3">{emp.designation}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.facility}</td>
                <td className="p-3">{emp.status}</td>

                {/* Actions */}
                <td className="p-3">
                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => navigate("/employees/form")}
                      className="text-blue-600 flex items-center gap-1 text-[11px]"
                    >
                      <Pencil size={14} />
                    </button>

                    <button className="text-red-500">
                      <Trash2 size={14} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between p-3 border-t text-[11px]">

        <p className="text-zinc-500">
          Page {page} of {totalPages}
        </p>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-1.5 rounded-md border hover:bg-zinc-100 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-1.5 rounded-md border hover:bg-zinc-100 disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default EmployeeTable;