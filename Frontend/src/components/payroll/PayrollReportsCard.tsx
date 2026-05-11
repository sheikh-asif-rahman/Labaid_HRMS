// ========================================
// src/components/payroll/PayrollReportsCard.tsx
// ========================================

import {
  ChevronRight,
} from "lucide-react";

import {
  payrollReportsData,
} from "../../data/payrollReportsData";

const PayrollReportsCard = () => {
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
          Payroll Reports
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Generated payroll reports
        </p>
      </div>

      {/* REPORTS */}
      <div className="space-y-3 flex-1">
        {payrollReportsData.map(
          (item) => (
            <button
              key={item.id}
              className="
                w-full
                border border-zinc-200
                rounded-2xl
                p-3
                text-left
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
                <div className="min-w-0">
                  <h4
                    className="
                      text-[11px]
                      font-medium
                      text-zinc-800
                    "
                  >
                    {item.title}
                  </h4>

                  <p
                    className="
                      text-[10px]
                      text-zinc-500
                      mt-1
                    "
                  >
                    {item.subtitle}
                  </p>

                  <p
                    className="
                      text-[9px]
                      text-zinc-400
                      mt-2
                    "
                  >
                    {item.date}
                  </p>
                </div>

                <div
                  className="
                    flex flex-col
                    items-end
                    gap-2
                    shrink-0
                  "
                >
                  <span
                    className={`
                      px-2 py-1
                      rounded-lg
                      text-[9px]
                      font-medium

                      ${
                        item.status ===
                        "Ready"
                          ? "bg-black text-white"
                          : item.status ===
                            "Processing"
                          ? "border border-black text-black"
                          : "bg-zinc-200 text-zinc-700"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                  <ChevronRight
                    size={14}
                    className="text-zinc-400"
                  />
                </div>
              </div>
            </button>
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
          4 reports available
        </p>

        <p
          className="
            text-[10px]
            text-zinc-400
          "
        >
          Updated today
        </p>
      </div>
    </div>
  );
};

export default PayrollReportsCard;