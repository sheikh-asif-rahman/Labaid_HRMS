// ========================================
// src/components/payroll/TopPaidEmployeesCard.tsx
// ========================================

import {
  topPaidEmployeesData,
} from "../../data/payrollInsightsData";

const TopPaidEmployeesCard = () => {
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
      <div className="mb-5">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Top Paid Employees
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Highest payroll earners
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-3 flex-1">
        {topPaidEmployeesData.map(
          (item, index) => (
            <div
              key={item.id}
              className="
                flex items-center justify-between
                gap-3
                border border-zinc-200
                rounded-2xl
                p-3
                hover:bg-zinc-50
                transition-all
              "
            >
              {/* LEFT */}
              <div className="flex items-center gap-3 min-w-0">
                {/* RANK */}
                <div
                  className="
                    h-9 w-9
                    rounded-xl
                    bg-black
                    text-white
                    flex items-center justify-center
                    text-xs
                    font-semibold
                    shrink-0
                  "
                >
                  #{index + 1}
                </div>

                {/* INFO */}
                <div className="min-w-0">
                  <h4
                    className="
                      text-[11px]
                      font-medium
                      text-zinc-800
                    "
                  >
                    {item.name}
                  </h4>

                  <p
                    className="
                      text-[10px]
                      text-zinc-500
                      mt-1
                    "
                  >
                    {item.department}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right shrink-0">
                <h5
                  className="
                    text-[11px]
                    font-semibold
                    text-zinc-800
                  "
                >
                  {item.salary}
                </h5>

                <p
                  className="
                    text-[10px]
                    text-zinc-500
                    mt-1
                  "
                >
                  {item.growth}
                </p>
              </div>
            </div>
          )
        )}
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
          Top 5 employees
        </p>

        <p
          className="
            text-[10px]
            text-zinc-400
          "
        >
          Payroll ranking
        </p>
      </div>
    </div>
  );
};

export default TopPaidEmployeesCard;