// ========================================
// src/components/payroll/PayrollTasksCard.tsx
// ========================================

import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  payrollTasksData,
} from "../../data/payrollRowThreeData";

const ITEMS_PER_PAGE = 5;

const PayrollTasksCard = () => {
  const [page, setPage] =
    useState(1);

  const totalPages = Math.ceil(
    payrollTasksData.length /
      ITEMS_PER_PAGE
  );

  const paginatedTasks =
    payrollTasksData.slice(
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
          flex items-center justify-between
          mb-4
          shrink-0
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
            Upcoming Tasks
          </h3>

          <p
            className="
              text-[10px]
              text-zinc-500
              mt-1
            "
          >
            Payroll workflow tasks
          </p>
        </div>

        {/* NAV */}
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
              shrink-0
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
              shrink-0
            "
          >
            <ChevronRight
              size={14}
            />
          </button>
        </div>
      </div>

      {/* TASK AREA */}
      <div
        className="
          flex-1
          flex flex-col
          justify-between
        "
      >
        {/* TASK LIST */}
        <div className="space-y-2">
          {paginatedTasks.map(
            (task) => (
              <div
                key={task.id}
                className="
                  border border-zinc-200
                  rounded-xl
                  px-3 py-2.5
                  hover:bg-zinc-50
                  transition-all
                "
              >
                <div
                  className="
                    flex items-start justify-between
                    gap-3
                  "
                >
                  {/* LEFT */}
                  <div className="min-w-0">
                    <h4
                      className="
                        text-[11px]
                        font-medium
                        text-zinc-800
                        truncate
                      "
                    >
                      {task.title}
                    </h4>

                    <p
                      className="
                        text-[10px]
                        text-zinc-500
                        mt-1
                        line-clamp-1
                      "
                    >
                      {task.subtitle}
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`
                      px-2 py-1
                      rounded-lg
                      text-[9px]
                      font-medium
                      whitespace-nowrap

                      ${
                        task.status ===
                        "Pending"
                          ? "bg-zinc-200 text-zinc-700"
                          : task.status ===
                            "Review"
                          ? "bg-zinc-100 text-zinc-600"
                          : task.status ===
                            "Ready"
                          ? "bg-black text-white"
                          : "bg-black text-white"
                      }
                    `}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* FOOTER */}
        <div
          className="
            pt-3 mt-4
            border-t border-zinc-200
            flex items-center justify-between
            shrink-0
          "
        >
          <p
            className="
              text-[10px]
              text-zinc-500
            "
          >
            Showing{" "}
            {(page - 1) *
              ITEMS_PER_PAGE +
              1}
            -
            {Math.min(
              page *
                ITEMS_PER_PAGE,
              payrollTasksData.length
            )}
          </p>

          <p
            className="
              text-[10px]
              text-zinc-400
            "
          >
            {page}/{totalPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayrollTasksCard;