// ========================================
// src/components/payroll/PayrollExportCard.tsx
// ========================================

import {
  payrollExportData,
} from "../../data/payrollReportsData";

const PayrollExportCard = () => {
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
          Export Center
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Export and download payroll data
        </p>
      </div>

      {/* BUTTONS */}
      <div
        className="
          grid
          grid-cols-1
          gap-3
          flex-1
        "
      >
        {payrollExportData.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <button
                key={item.id}
                className="
                  w-full
                  border border-zinc-200
                  rounded-2xl
                  p-4
                  flex items-center gap-4
                  hover:bg-black
                  hover:text-white
                  transition-all
                  group
                "
              >
                <div
                  className="
                    h-10 w-10
                    rounded-xl
                    border border-zinc-200
                    flex items-center justify-center
                    group-hover:bg-white
                    group-hover:text-black
                    transition-all
                    shrink-0
                  "
                >
                  <Icon size={18} />
                </div>

                <div className="text-left">
                  <h4
                    className="
                      text-xs
                      font-medium
                    "
                  >
                    {item.title}
                  </h4>

                  <p
                    className="
                      text-[10px]
                      text-zinc-500
                      mt-1
                      group-hover:text-zinc-300
                    "
                  >
                    Generate payroll file
                  </p>
                </div>
              </button>
            );
          }
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
          Export formats ready
        </p>

        <p
          className="
            text-[10px]
            text-zinc-400
          "
        >
          CSV / PDF
        </p>
      </div>
    </div>
  );
};

export default PayrollExportCard;