// ========================================
// src/components/payroll/PayslipDownloadsCard.tsx
// ========================================

import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react";

import { payslipData } from "../../data/payrollPayslipData";

const ITEMS_PER_PAGE = 5;

const PayslipDownloadsCard = () => {
  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  // ========================================
  // FILTER
  // ========================================

  const filteredData =
    useMemo(() => {
      return payslipData.filter(
        (item) =>
          item.employee
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [search]);

  // ========================================
  // PAGINATION
  // ========================================

  const totalPages = Math.ceil(
    filteredData.length /
      ITEMS_PER_PAGE
  );

  const paginatedData =
    filteredData.slice(
      (page - 1) *
        ITEMS_PER_PAGE,

      page * ITEMS_PER_PAGE
    );

  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        h-full
        flex flex-col
      "
    >
      {/* HEADER */}
      <div
        className="
          flex flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-3
          mb-4
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-semibold
              text-zinc-800
            "
          >
            Payslip Downloads
          </h3>

          <p
            className="
              text-[10px]
              text-zinc-500
              mt-1
            "
          >
            Employee salary slips
          </p>
        </div>

        {/* SEARCH */}
        <div
          className="
            flex items-center gap-2
            border border-zinc-200
            rounded-xl
            px-3 py-2
            w-full md:w-[220px]
          "
        >
          <Search
            size={14}
            className="text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search employee"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              bg-transparent
              outline-none
              text-[11px]
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr
              className="
                border-b border-zinc-200
              "
            >
              {[
                "Employee",
                "Month",
                "Salary",
                "Status",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="
                    text-left
                    py-3
                    px-2
                    text-[10px]
                    font-semibold
                    text-zinc-500
                    uppercase
                    whitespace-nowrap
                  "
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map(
              (item) => (
                <tr
                  key={item.id}
                  className="
                    border-b border-zinc-100
                    hover:bg-zinc-50
                    transition-all
                  "
                >
                  <td
                    className="
                      py-3 px-2
                      text-[11px]
                      font-medium
                      text-zinc-800
                      whitespace-nowrap
                    "
                  >
                    {item.employee}
                  </td>

                  <td
                    className="
                      py-3 px-2
                      text-[11px]
                      text-zinc-600
                      whitespace-nowrap
                    "
                  >
                    {item.month}
                  </td>

                  <td
                    className="
                      py-3 px-2
                      text-[11px]
                      text-zinc-800
                      whitespace-nowrap
                    "
                  >
                    {item.salary}
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`
                        px-2 py-1
                        rounded-lg
                        text-[9px]
                        font-medium

                        ${
                          item.status ===
                          "Paid"
                            ? "bg-black text-white"
                            : item.status ===
                              "Pending"
                            ? "bg-zinc-200 text-zinc-700"
                            : "bg-zinc-100 text-zinc-600"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-2">
                    <button
                      className="
                        h-8 w-8
                        rounded-xl
                        border border-zinc-200
                        flex items-center justify-center
                        hover:bg-black
                        hover:text-white
                        transition-all
                      "
                    >
                      <Download
                        size={14}
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div
        className="
          pt-4 mt-4
          border-t border-zinc-200
          flex items-center justify-between
        "
      >
        <p
          className="
            text-[10px]
            text-zinc-500
          "
        >
          {filteredData.length} payslips
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setPage((prev) =>
                Math.max(
                  prev - 1,
                  1
                )
              )
            }
            disabled={page === 1}
            className="
              h-8 w-8
              rounded-xl
              border border-zinc-200
              flex items-center justify-center
              hover:bg-zinc-100
              transition-all
              disabled:opacity-40
            "
          >
            <ChevronLeft
              size={14}
            />
          </button>

          <button
            onClick={() =>
              setPage((prev) =>
                Math.min(
                  prev + 1,
                  totalPages
                )
              )
            }
            disabled={
              page === totalPages
            }
            className="
              h-8 w-8
              rounded-xl
              border border-zinc-200
              flex items-center justify-center
              hover:bg-zinc-100
              transition-all
              disabled:opacity-40
            "
          >
            <ChevronRight
              size={14}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayslipDownloadsCard;