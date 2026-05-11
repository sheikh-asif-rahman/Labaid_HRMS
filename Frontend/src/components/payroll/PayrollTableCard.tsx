import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { payrollTableData } from "../../data/payrollRowTwoData";

const ITEMS_PER_PAGE = 10;

const PayrollTableCard = () => {
  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  // FILTER
  const filteredData = useMemo(() => {
    return payrollTableData.filter(
      (item) =>
        item.employee
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.department
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.basic
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.bonus
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.deduction
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.net
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.status
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  }, [search]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredData.length /
      ITEMS_PER_PAGE
  );

  const paginatedData =
    filteredData.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );

  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        min-w-0
      "
    >
      {/* HEADER */}
      <div
        className="
          flex flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
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
            Payroll Records
          </h3>

          <p
            className="
              text-[11px]
              text-zinc-500
              mt-1
            "
          >
            Employee salary processing
          </p>
        </div>

        {/* FILTER */}
        <div
          className="
            flex items-center gap-2
            px-3 py-2
            rounded-xl
            border border-zinc-200
            bg-white
            w-full
            md:w-[240px]
          "
        >
          <Search
            size={14}
            className="text-zinc-500 shrink-0"
          />

          <input
            type="text"
            placeholder="Search payroll..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setCurrentPage(1);
            }}
            className="
              w-full
              bg-transparent
              outline-none
              text-[11px]
              min-w-0
            "
          />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex flex-col gap-3 lg:hidden">
        {paginatedData.map((item) => (
          <div
            key={item.id}
            className="
              border border-zinc-200
              rounded-2xl
              p-3
            "
          >
            {/* TOP */}
            <div
              className="
                flex items-start justify-between
                gap-3
                mb-3
              "
            >
              <div className="min-w-0">
                <h4
                  className="
                    text-[11px]
                    font-semibold
                    text-zinc-800
                  "
                >
                  {item.employee}
                </h4>

                <p
                  className="
                    text-[10px]
                    text-zinc-500
                    mt-1
                  "
                >
                  {item.id}
                </p>
              </div>

              <span
                className={`
                  px-3 py-1 rounded-xl text-[10px] font-medium whitespace-nowrap
                  ${
                    item.status === "Paid"
                      ? "bg-black text-white"
                      : item.status ===
                        "Pending"
                      ? "bg-zinc-200 text-zinc-700"
                      : "bg-zinc-100 text-zinc-500"
                  }
                `}
              >
                {item.status}
              </span>
            </div>

            {/* GRID */}
            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Department
                </p>

                <h5
                  className="
                    text-[11px]
                    font-medium
                    text-zinc-800
                    mt-1
                  "
                >
                  {item.department}
                </h5>
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Basic
                </p>

                <h5
                  className="
                    text-[11px]
                    font-medium
                    text-zinc-800
                    mt-1
                  "
                >
                  {item.basic}
                </h5>
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Bonus
                </p>

                <h5
                  className="
                    text-[11px]
                    font-medium
                    text-zinc-800
                    mt-1
                  "
                >
                  {item.bonus}
                </h5>
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Deduction
                </p>

                <h5
                  className="
                    text-[11px]
                    font-medium
                    text-zinc-800
                    mt-1
                  "
                >
                  {item.deduction}
                </h5>
              </div>

              <div className="col-span-2">
                <p
                  className="
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Net Salary
                </p>

                <h5
                  className="
                    text-[12px]
                    font-semibold
                    text-zinc-800
                    mt-1
                  "
                >
                  {item.net}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200">
                {[
                  "Employee",
                  "Department",
                  "Basic",
                  "Bonus",
                  "Deduction",
                  "Net Salary",
                  "Status",
                ].map((head) => (
                  <th
                    key={head}
                    className="
                      text-left
                      py-3
                      text-[11px]
                      font-medium
                      text-zinc-500
                      whitespace-nowrap
                    "
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b border-zinc-100
                    last:border-none
                  "
                >
                  <td className="py-4">
                    <div>
                      <h4
                        className="
                          text-[11px]
                          font-medium
                          text-zinc-800
                        "
                      >
                        {item.employee}
                      </h4>

                      <p
                        className="
                          text-[10px]
                          text-zinc-500
                          mt-1
                        "
                      >
                        {item.id}
                      </p>
                    </div>
                  </td>

                  <td
                    className="
                      text-[11px]
                      text-zinc-700
                    "
                  >
                    {item.department}
                  </td>

                  <td
                    className="
                      text-[11px]
                      text-zinc-700
                    "
                  >
                    {item.basic}
                  </td>

                  <td
                    className="
                      text-[11px]
                      text-zinc-700
                    "
                  >
                    {item.bonus}
                  </td>

                  <td
                    className="
                      text-[11px]
                      text-zinc-700
                    "
                  >
                    {item.deduction}
                  </td>

                  <td
                    className="
                      text-[11px]
                      font-semibold
                      text-zinc-800
                    "
                  >
                    {item.net}
                  </td>

                  <td>
                    <span
                      className={`
                        px-3 py-1.5 rounded-xl text-[10px] font-medium
                        ${
                          item.status ===
                          "Paid"
                            ? "bg-black text-white"
                            : item.status ===
                              "Pending"
                            ? "bg-zinc-200 text-zinc-700"
                            : "bg-zinc-100 text-zinc-500"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div
        className="
          flex flex-col
          sm:flex-row
          items-center
          justify-between
          gap-4
          pt-4
          border-t border-zinc-200
          mt-4
        "
      >
        {/* INFO */}
        <p
          className="
            text-[11px]
            text-zinc-500
          "
        >
          Showing{" "}
          {(currentPage - 1) *
            ITEMS_PER_PAGE +
            1}
          {" - "}
          {Math.min(
            currentPage *
              ITEMS_PER_PAGE,
            filteredData.length
          )}{" "}
          of {filteredData.length} records
        </p>

        {/* BUTTONS */}
        <div className="flex items-center gap-2">
          {/* PREV */}
          <button
            onClick={() =>
              setCurrentPage(
                (prev) =>
                  Math.max(
                    prev - 1,
                    1
                  )
              )
            }
            disabled={
              currentPage === 1
            }
            className="
              px-3 py-2
              rounded-xl
              border border-zinc-200
              text-[11px]
              font-medium
              disabled:opacity-40
              hover:bg-zinc-100
              transition-all
            "
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          {Array.from({
            length: totalPages,
          })
            .slice(0, 5)
            .map((_, index) => {
              const page =
                index + 1;

              return (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                  className={`
                    h-9 w-9
                    rounded-xl
                    text-[11px]
                    font-medium
                    transition-all
                    ${
                      currentPage ===
                      page
                        ? "bg-black text-white"
                        : "border border-zinc-200 hover:bg-zinc-100"
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}

          {/* NEXT */}
          <button
            onClick={() =>
              setCurrentPage(
                (prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
            className="
              px-3 py-2
              rounded-xl
              border border-zinc-200
              text-[11px]
              font-medium
              disabled:opacity-40
              hover:bg-zinc-100
              transition-all
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollTableCard;